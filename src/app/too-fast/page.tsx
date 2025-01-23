"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function TooFastPage() {
  const router = useRouter()

  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, slow down there! You&apos;re moving too fast!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly.
      </p>

      <Button size="lg" onClick={() => router.push("/")} className="mt-8">
        Go home
      </Button>
    </main>
  )
}
