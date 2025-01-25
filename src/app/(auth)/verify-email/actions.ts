"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { env } from "@/config"
import {
  createEmailVerificationRequest,
  deleteEmailVerificationRequestCookie,
  deleteUserEmailVerificationRequest,
  getUserEmailVerificationRequestFromRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/server/email-verification"
import { getSession } from "@/server/session"
import { updateUserEmailAndSetStatusToApproved } from "@/server/user"
import { workflowClient } from "@/server/workflow"
import { ReturnType } from "@/types"
import { VerifyEmailSchema } from "@/validators"

export async function verifyEmail(
  values: z.infer<typeof VerifyEmailSchema>,
): Promise<ReturnType> {
  const { session, user } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Unauthorized",
      key: "unauthorized",
    }
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null) {
    return {
      success: false,
      message: "No verification request found",
      key: "no_verification_request_found",
    }
  }

  if (Date.now() >= verificationRequest.expiresAt.getTime()) {
    verificationRequest = await createEmailVerificationRequest(
      verificationRequest.userId,
      verificationRequest.email,
    )
    await sendVerificationEmail(
      user.fullName,
      verificationRequest.email,
      verificationRequest.code,
    )

    return {
      success: false,
      message: "Verification code expired. New code sent",
      key: "verification_code_expired",
    }
  }
  if (verificationRequest.code !== values.code) {
    return {
      success: false,
      message: "Invalid verification code",
      key: "invalid_verification_code",
    }
  }

  await deleteUserEmailVerificationRequest(user.id)
  // TODO: Invalidate all password reset requests
  // await invalidateUserPasswordResetRequests(user.id)
  await updateUserEmailAndSetStatusToApproved({
    email: verificationRequest.email,
  })
  await deleteEmailVerificationRequestCookie()

  await workflowClient.trigger({
    url: `${env.apiEndpoint}/workflow/onboarding`,
    body: {
      email: user.email,
      fullName: user.fullName,
    },
  })

  if (user.universityId === null || user.studentId === null) {
    return redirect("/onboarding")
  } else {
    return redirect("/")
  }
}

export async function resendEmailVerificationCode(): Promise<ReturnType> {
  const { session, user } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Unauthorized",
      key: "unauthorized",
    }
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null) {
    if (user.status === "APPROVED") {
      return {
        success: false,
        message: "Email already verified",
        key: "email_already_verified",
      }
    }
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      user.email,
    )
  } else {
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      verificationRequest.email,
    )
  }
  sendVerificationEmail(
    user.fullName,
    verificationRequest.email,
    verificationRequest.code,
  )
  setEmailVerificationRequestCookie(verificationRequest)

  return {
    success: true,
    message: "Verification email sent",
    key: "verification_email_sent",
  }
}
