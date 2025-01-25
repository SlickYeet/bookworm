import { serve } from "@upstash/workflow/nextjs"

import { db } from "@/server/db"
import { sendEmail } from "@/server/email"

type UserState = "non-active" | "active"

type InitialData = {
  fullName: string
  email: string
}

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3
const THIRTY_DAYS_IN_MS = ONE_DAY_IN_MS * 30

async function getUserState(email: string): Promise<UserState> {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user === null) {
    return "non-active"
  }

  const lastActiveAt = new Date(user.lastActiveAt!)
  const now = new Date()
  const timeDiff = now.getTime() - lastActiveAt.getTime()
  if (timeDiff > THREE_DAYS_IN_MS && timeDiff < THIRTY_DAYS_IN_MS) {
    return "non-active"
  }

  return "active"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  // Welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to BookWorm",
      template: "welcome",
      data: { fullName, email },
    })
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      // Non-active email
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there?",
          template: "non-active",
          data: { fullName },
        })
      })
    } else if (state === "active") {
      // Active email
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Keep reading!",
          template: "active",
          data: { fullName },
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})
