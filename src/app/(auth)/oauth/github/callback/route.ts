import { ObjectParser } from "@pilcrowjs/object-parser"
import { OAuth2Tokens } from "arctic"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import {
  createEmailVerificationRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/server/email-verification"
import { github } from "@/server/oauth"
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

  const storedState = cookieStore.get("github_oauth_state")?.value ?? null

  if (code === null || state === null || storedState === null) {
    return new NextResponse("Invalid request", { status: 400 })
  }
  if (state !== storedState) {
    return new NextResponse("Invalid state", { status: 400 })
  }

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  } catch {
    return new NextResponse("Invalid code", { status: 400 })
  }

  const githubAccessToken = tokens.accessToken()

  const userRequest = new Request("https://api.github.com/user")
  userRequest.headers.set("Authorization", `Bearer ${githubAccessToken}`)
  const userResponse = await fetch(userRequest)
  const userResult: unknown = await userResponse.json()
  const userParser = new ObjectParser(userResult)

  const oAuthId = userParser.getNumber("id").toString()
  const fullName = userParser.getString("login")
  const pictureUrl = userParser.getString("avatar_url")

  const existingUser = await getUserFromOAuthId(oAuthId)
  if (existingUser !== null) {
    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, existingUser.id)
    setSessionTokenCookie(sessionToken, session.expiresAt)
    if (existingUser.status === "PENDING") {
      console.log("Redirecting to /verify-email")
      console.log(existingUser.status === "PENDING")
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

  const emailListRequest = new Request("https://api.github.com/user/emails")
  emailListRequest.headers.set("Authorization", `Bearer ${githubAccessToken}`)
  const emailListResponse = await fetch(emailListRequest)
  const emailListResult: unknown = await emailListResponse.json()
  if (!Array.isArray(emailListResult)) {
    return new NextResponse("Invalid email list", { status: 400 })
  }

  let email: string | null = null
  for (const emailRecord of emailListResult) {
    const emailParser = new ObjectParser(emailRecord)
    const primaryEmail = emailParser.getBoolean("primary")
    const verifiedEmail = emailParser.getBoolean("verified")
    if (primaryEmail && verifiedEmail) {
      email = emailParser.getString("email")
    }
  }
  if (email === null) {
    return new NextResponse("No primary verified email", { status: 400 })
  }

  const user = await createUser({
    oAuthId,
    email,
    fullName,
    pictureUrl,
    accountProvider: "GITHUB",
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
