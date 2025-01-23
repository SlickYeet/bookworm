"use server"

import {
  deleteSessionTokenCookie,
  getSession,
  invalidateSession,
} from "@/server/session"
import { ReturnType } from "@/types"

export async function signOut(): Promise<ReturnType<null>> {
  const { session } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Not authenticated",
      key: "not_authenticated",
    }
  }
  await invalidateSession(session.id)
  deleteSessionTokenCookie()

  return {
    success: true,
    message: "Signed out",
    key: "signed_out",
  }
}
