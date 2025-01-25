import { Row } from "@tanstack/react-table"
import { EditIcon, MoreHorizontalIcon, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { deleteBorrowRecord } from "../actions"
import { BorrowRecordWithUser } from "./columns"

export function RowActions({ row }: { row: Row<BorrowRecordWithUser> }) {
  const record = row.original

  const handleDelete = async (id: string) => {
    try {
      await deleteBorrowRecord(id)
      toast.success("Record deleted successfully")
    } catch {
      console.error("Failed to delete record")
      toast.error("Failed to delete record")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="focus:bg-primary-admin/10 focus:text-primary-admin"
          asChild
        >
          <Link href={`/admin/borrow-records/${record.id}`}>
            <EditIcon />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(record.id)}
          className="text-rose-500 focus:bg-rose-100 focus:text-rose-700"
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
