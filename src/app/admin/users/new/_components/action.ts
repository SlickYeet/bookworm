"use server"

import type { User } from "@prisma/client"
import { z } from "zod"

import { createUser } from "@/server/user"
import { SignUpSchema } from "@/validators"

export async function adminCreateUser(
  values: z.infer<typeof SignUpSchema>,
): Promise<User> {
  return createUser(values)
}
