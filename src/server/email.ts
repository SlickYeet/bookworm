"use server"

import { STATUS } from "@prisma/client"
import { resend } from "@upstash/qstash"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { emailRenderer, EmailTemplates } from "@/components/email-renderer"
import { env } from "@/config"
import { ratelimit } from "@/lib/ratelimit"
import { db } from "@/server/db"

import { qStashClient } from "./workflow"

export async function sendEmail({
  email,
  subject,
  template,
  data,
}: {
  email: string
  subject: string
  template: EmailTemplates
  data: object
}): Promise<void> {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)
  if (!success) return redirect("/too-fast")

  const body = await emailRenderer({ template, data })
  if (body === null) {
    throw new Error("Invalid email template")
  }
  await qStashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: env.resend.token }),
    },
    body: {
      from: `HHN BookWorm <${env.resend.emailUser}>`,
      to: [email],
      subject,
      body,
    },
  })
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user === null) {
    return true
  }
  return false
}

export async function checkEmailIsVerified(email: string): Promise<STATUS> {
  const user = await db.user.findUnique({
    where: { email },
    select: { status: true },
  })
  if (user === null) {
    throw new Error("User not found")
  }

  return user.status
}
