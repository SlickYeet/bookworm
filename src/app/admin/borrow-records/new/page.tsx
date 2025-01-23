import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { sampleBooks } from "@/constants"
import { db } from "@/server/db"

import { BorrowRecordForm } from "./_components/borrow-record-form"

export default async function NewBorrowRecordPage() {
  const users = await db.user.findMany()
  const dbBooks = await db.book.findMany()

  const books = dbBooks.length > 0 ? dbBooks : sampleBooks

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/borrow-records">
          <ChevronLeftIcon />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BorrowRecordForm users={users} books={books} />
      </section>
    </>
  )
}
