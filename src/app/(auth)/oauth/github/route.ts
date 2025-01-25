import { generateState } from "arctic"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { github } from "@/server/oauth"

export async function GET(): Promise<NextResponse> {
  const state = generateState()

  const url = github.createAuthorizationURL(state, ["user:email"])

  const cookieStore = await cookies()

  cookieStore.set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
