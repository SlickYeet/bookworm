import { CirclePlusIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function AccountRequestsPage() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">All Account Requests</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/account-requests/new" className="text-white">
            <CirclePlusIcon /> Create a New Requests
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  )
}
