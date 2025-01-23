import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function BorrowRecordsPage() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Borrow Records</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/borrow-records/new" className="text-white">
            + Create a New User
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  )
}
