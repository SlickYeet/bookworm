import { Row } from "@tanstack/react-table"
import {
  EditIcon,
  FileQuestionIcon,
  MoreHorizontalIcon,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnType } from "./columns"
import Link from "next/link"

export function RowActions({ row }: { row: Row<ColumnType> }) {
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
          <Link href={`/admin/borrow-records/${row.original.id}`}>
            <EditIcon />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-primary-admin/10 focus:text-primary-admin">
          <FileQuestionIcon />
          Something else
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 focus:bg-rose-100 focus:text-rose-700">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
