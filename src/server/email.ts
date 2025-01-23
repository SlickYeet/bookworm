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
