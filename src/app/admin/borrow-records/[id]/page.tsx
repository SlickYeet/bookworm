import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { db } from "@/server/db"

import { UpdateBorrowRecordForm } from "./_components/update-borrow-record-form"

interface BorrowRecordPageProps {
  params: Promise<{ id: string }>
}

export default async function BorrowRecordPage({
  params,
}: BorrowRecordPageProps) {
  const { id } = await params

  const record = await db.borrowRecord.findUnique({
    where: { id },
    include: { user: true, book: true },
  })
  const users = await db.user.findMany()
  const books = await db.book.findMany()

  if (!record) return notFound()

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/borrow-records">
          <ChevronLeftIcon />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <UpdateBorrowRecordForm record={record} users={users} books={books} />
      </section>
    </>
  )
}
