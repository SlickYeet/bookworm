"use client"

import type { BorrowRecord, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"

import { BookIdCell } from "./book-id-cell"
import { RowActions } from "./row-actions"
import { StatusCell } from "./status-cell"
import { UserCell } from "./user-cell"

export type BorrowRecordWithUser = {
  user: User
} & BorrowRecord

export const column: ColumnDef<BorrowRecordWithUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => <UserCell user={row.original.user} />,
    enableHiding: false,
  },
  {
    accessorKey: "bookId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Book ID" />
    ),
    cell: ({ row }) => <BookIdCell bookId={row.original.bookId} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell {...row.original} />,
  },
  {
    accessorKey: "borrowDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrowed At" />
    ),
    cell: ({ row }) => {
      const date = row.original.borrowDate
      return date ? format(new Date(date), "MM/dd/yyyy") : "N/A"
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.dueDate
      return date ? format(new Date(date), "MM/dd/yyyy") : "N/A"
    },
  },
  {
    accessorKey: "returnDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Returned At" />
    ),
    cell: ({ row }) => {
      const date = row.original.returnDate
      return date ? format(new Date(date), "MM/dd/yyyy") : "N/A"
    },
  },
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <RowActions row={row} />
    },
  },
]
