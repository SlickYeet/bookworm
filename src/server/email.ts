import { Client as QStashClient, resend } from "@upstash/qstash"
import { Client as WorkflowClient } from "@upstash/workflow"

import { emailRenderer, EmailTemplates } from "@/components/email-renderer"
import { env } from "@/config"
import { db } from "@/server/db"

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user === null) {
    return true
  }
  return false
}

export const workflowClient = new WorkflowClient({
  baseUrl: env.upstash.qStash.url,
  token: env.upstash.qStash.token,
})

const qStashClient = new QStashClient({
  token: env.upstash.qStash.token,
})

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
      html: body,
    },
  })
}
