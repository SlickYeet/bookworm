import { CirclePlusIcon } from "lucide-react"
import Link from "next/link"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { db } from "@/server/db"

import { column } from "./_components/columns"

export default async function BorrowRecordsPage() {
  const data = await db.borrowRecord.findMany({
    include: { user: true },
  })

  const sortedData = data.sort((a, b) => {
    if (a.returnDate && b.returnDate) {
      return new Date(b.returnDate).getTime() - new Date(a.returnDate).getTime()
    }
    if (a.returnDate) return 1
    if (b.returnDate) return -1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Borrow Records</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/borrow-records/new" className="text-white">
            <CirclePlusIcon /> Create a New Record
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full">
        <DataTable columns={column} data={sortedData} />
      </div>
    </section>
  )
}
