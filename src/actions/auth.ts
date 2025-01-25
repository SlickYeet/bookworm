"use server"

import { redirect } from "next/navigation"

import {
  deleteSessionTokenCookie,
  getSession,
  invalidateSession,
} from "@/server/session"

export async function signOut(): Promise<void> {
  const { session } = await getSession()
  if (session === null) {
    throw new Error("No session found")
  }
  await invalidateSession(session.id)
  deleteSessionTokenCookie()

  return redirect("/sign-in")
}
