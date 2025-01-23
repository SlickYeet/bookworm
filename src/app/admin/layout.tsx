import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { getSession } from "@/server/session"

import { Header } from "./_components/header"
import { Sidebar } from "./_components/sidebar"
import "./styles.css"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { session, user } = await getSession()
  if (session === null) {
    redirect("/sign-in")
  }
  if (user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar user={user} />

      <div className="admin-container">
        <Header user={user} />
        {children}
      </div>
    </main>
  )
}
