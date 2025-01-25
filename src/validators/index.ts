import { ACCOUNT_PROVIDER, BORROW_STATUS, STATUS } from "@prisma/client"
import { z } from "zod"

export const SignUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number().nullable(),
  studentId: z.string().nullable(),
  password: z.string().min(8).nullable(),
  pictureUrl: z.string().optional(),
  accountProvider: z.nativeEnum(ACCOUNT_PROVIDER).optional(),
  oAuthId: z.coerce.string().optional(),
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  pictureUrl: z.string().optional(),
  accountProvider: z.nativeEnum(ACCOUNT_PROVIDER).optional(),
  oAuthId: z.coerce.string().optional(),
})

export const OAuthOnboardingSchema = z.object({
  studentId: z.string(),
  universityId: z.coerce.number(),
})

export const VerifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const BookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  description: z.string().trim().min(10).max(1000),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  coverUrl: z.string().nonempty(),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
})

export const BorrowRecordSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  status: z.nativeEnum(BORROW_STATUS).optional(),
  borrowDate: z.date().optional(),
  dueDate: z.date().optional(),
  returnDate: z.date().nullable(),
})

export const AccountRequestSchema = z.object({
  userId: z.string(),
  status: z.nativeEnum(STATUS),
  message: z.string().optional(),
})
