import { redirect } from "next/navigation"

import { getUserEmailVerificationRequestFromRequest } from "@/server/email-verification"
import { getSession } from "@/server/session"

import { VerifyEmailForm } from "./_components/verify-email-form"

export default async function VerifyEmailPage() {
  const { session, user } = await getSession()
  if (session === null) {
    return redirect("/sign-in")
  }

  if (user.universityId !== null && user.studentId !== null) {
    return redirect("/onboarding")
  }

  const verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null && user.status === "APPROVED") {
    return redirect("/")
  }

  return <VerifyEmailForm email={user.email} />
}
