import { CirclePlusIcon } from "lucide-react"
import Link from "next/link"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { db } from "@/server/db"

import { column } from "./_components/columns"

export default async function BorrowRecordsPage() {
  const borrowRecords = await db.borrowRecord.findMany()
  const userIds = borrowRecords.map((record) => record.userId)
  const users = await db.user.findMany({
    where: { id: { in: userIds } },
  })

  const data = borrowRecords.map((record) => ({
    ...record,
    user: users.find((user) => user.id === record.userId),
  }))

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Borrow Records</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/borrow-records/new" className="text-white">
            <CirclePlusIcon /> Create a New User
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <DataTable columns={column} data={data} />
      </div>
    </section>
  )
}
