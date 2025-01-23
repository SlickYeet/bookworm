import { type User } from "@prisma/client"
import { hash } from "bcryptjs"
import { z } from "zod"

import { db } from "@/server/db"
import { SignUpSchema } from "@/validators"

export async function createUser(
  values: z.infer<typeof SignUpSchema>,
): Promise<User> {
  const passwordHash = await hash(values.password, 12)

  const user = await db.user.create({
    data: { ...values, password: passwordHash },
  })
  if (user === null) {
    throw new Error("Unexpected error")
  }

  return user
}
