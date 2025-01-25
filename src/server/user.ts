"use server"

import { type User } from "@prisma/client"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/server/db"
import { ReturnType } from "@/types"
import { OAuthOnboardingSchema, SignUpSchema } from "@/validators"

import { checkEmailAvailability } from "./email"
import { getSession } from "./session"

export async function createUser(
  values: z.infer<typeof SignUpSchema>,
): Promise<User> {
  const isEmailAvailable = await checkEmailAvailability(values.email)
  if (!isEmailAvailable) {
    throw new Error("Email is already in use")
  }

  let password = values.password ?? null
  if (values.password) {
    const passwordHash = await hash(values.password, 12)
    password = passwordHash
  }

  let user: User | null = null

  if (values.accountProvider && values.oAuthId) {
    user = await db.user.create({
      data: {
        email: values.email,
        fullName: values.fullName,
        pictureUrl: values.pictureUrl,
        password,
        universityId: values.universityId,
        studentId: values.studentId,
        accounts: {
          create: {
            provider: values.accountProvider,
            oAuthId: values.oAuthId,
          },
        },
      },
    })
  } else {
    user = await db.user.create({
      data: {
        email: values.email,
        fullName: values.fullName,
        pictureUrl: values.pictureUrl,
        password,
        universityId: values.universityId,
        studentId: values.studentId,
      },
    })
  }

  if (user === null) {
    throw new Error("Unexpected error")
  }

  return user
}

export async function userOAuthOnboarding(
  values: z.infer<typeof OAuthOnboardingSchema>,
): Promise<ReturnType<User>> {
  const { user } = await getSession()
  if (user === null) {
    return {
      success: false,
      message: "User not found",
      key: "user_not_found",
      data: null,
    }
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      universityId: values.universityId,
      studentId: values.studentId,
    },
  })

  return redirect("/")
}

export async function getUserFromOAuthId(
  oAuthId: string,
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: { accounts: { some: { oAuthId } } },
  })
  if (user === null) {
    return null
  }
  return user
}

export async function updateUserEmailAndSetStatusToApproved({
  email,
}: {
  email: string
}): Promise<void> {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user === null) {
    throw new Error("User not found")
  }

  await db.user.update({
    where: { id: user.id },
    data: { email, status: "APPROVED" },
  })
}
