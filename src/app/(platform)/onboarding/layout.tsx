import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { getSession } from "@/server/session"

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  const { session, user } = await getSession()
  if (session === null) {
    return redirect("sign-in")
  }
  if (user.universityId !== null && user.studentId !== null) {
    return redirect("/")
  }

  return <>{children}</>
}
