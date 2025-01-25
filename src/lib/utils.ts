import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((c) => c[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

export function generateOTP(): string {
  const MIN = 100000
  const MAX = 999999
  const totp = (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN).toString()
  return totp
}
