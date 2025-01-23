import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { db } from "@/server/db"

import { AccountRequestForm } from "./_components/account-requests-form"

export default async function NewAccountRequestPage() {
  const users = await db.user.findMany()

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/account-requests">
          <ChevronLeftIcon />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <AccountRequestForm users={users} />
      </section>
    </>
  )
}
