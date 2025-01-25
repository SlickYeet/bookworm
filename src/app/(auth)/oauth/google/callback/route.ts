import { ObjectParser } from "@pilcrowjs/object-parser"
import { decodeIdToken, OAuth2Tokens } from "arctic"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import {
  createEmailVerificationRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/server/email-verification"
import { google } from "@/server/oauth"
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/server/session"
import { createUser, getUserFromOAuthId } from "@/server/user"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  const cookieStore = await cookies()

  const storedState = cookieStore.get("google_oauth_state")?.value ?? null
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new NextResponse("Invalid request", { status: 400 })
  }
  if (state !== storedState) {
    return new NextResponse("Invalid state", { status: 400 })
  }

  let tokens: OAuth2Tokens
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier!)
  } catch {
    return new NextResponse("Invalid code", { status: 400 })
  }

  const claims = decodeIdToken(tokens.idToken())
  const claimsParser = new ObjectParser(claims)

  const oAuthId = claimsParser.getString("sub")
  const email = claimsParser.getString("email")
  const fullName = claimsParser.getString("name")
  const pictureUrl = claimsParser.getString("picture")

  const existingUser = await getUserFromOAuthId(oAuthId)
  if (existingUser !== null) {
    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, existingUser.id)
    setSessionTokenCookie(sessionToken, session.expiresAt)
    if (existingUser.status === "PENDING") {
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/verify-email",
        },
      })
    }
    if (existingUser.studentId === null || existingUser.universityId === null) {
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/onboarding",
        },
      })
    }

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    })
  }

  if (email === null) {
    return new NextResponse("Email is required", { status: 400 })
  }

  const user = await createUser({
    oAuthId,
    email,
    fullName,
    pictureUrl,
    accountProvider: "GOOGLE",
    password: null,
    universityId: null,
    studentId: null,
  })

  const emailVerification = await createEmailVerificationRequest(user.id, email)
  sendVerificationEmail(
    user.fullName,
    emailVerification.email,
    emailVerification.code,
  )
  setEmailVerificationRequestCookie(emailVerification)

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  setSessionTokenCookie(sessionToken, session.expiresAt)

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/verify-email",
    },
  })
}
