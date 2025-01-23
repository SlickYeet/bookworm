"use server"

import { compare } from "bcryptjs"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/server/db"
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/server/session"
import { ReturnType } from "@/types"
import { SignInSchema } from "@/validators"

export async function signIn(
  values: z.infer<typeof SignInSchema>,
): Promise<ReturnType<null>> {
  try {
    SignInSchema.parse(values)
  } catch {
    return {
      success: false,
      message: "Invalid email or password",
      key: "invalid_credentials",
    }
  }

  const user = await db.user.findUnique({
    where: { email: values.email },
  })
  if (user === null) {
    return {
      success: false,
      message: "No user with that email found",
      key: "user_not_found",
    }
  }

  const isPasswordValid = await compare(values.password, user.password)
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid email or password",
      key: "invalid_password",
    }
  }

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  setSessionTokenCookie(sessionToken, session.expiresAt)

  return redirect("/")
}
