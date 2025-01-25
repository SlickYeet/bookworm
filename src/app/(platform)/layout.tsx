import { redirect } from "next/navigation"
import { after } from "next/server"
import { ReactNode } from "react"

import { db } from "@/server/db"
import { getSession } from "@/server/session"

import { Header } from "./_components/header"

export default async function PlatformLayout({
  children,
}: {
  children: ReactNode
}) {
  const { session, user } = await getSession()
  if (!session) {
    redirect("/sign-in")
  }

  after(async () => {
    if (!user?.id) return

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
    })
    if (dbUser?.lastActiveAt === new Date()) {
      return
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        lastActiveAt: new Date(),
      },
    })
  })

  return (
    <main className="root-container">
      <div className="mx-auto w-full max-w-7xl">
        <Header user={user} />

        <div className="my-20 pb-20">{children}</div>
      </div>
    </main>
  )
}
