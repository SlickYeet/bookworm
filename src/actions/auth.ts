"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ratelimit } from "@/lib/ratelimit"
import {
  deleteSessionTokenCookie,
  getSession,
  invalidateSession,
} from "@/server/session"

export async function signOut(): Promise<void> {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)
  if (!success) return redirect("too-fast")

  const { session } = await getSession()
  if (session === null) {
    throw new Error("No session found")
  }
  await invalidateSession(session.id)
  deleteSessionTokenCookie()

  return redirect("/sign-in")
}
