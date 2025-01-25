import { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

interface DataTableSearchInputProps<TData> {
  table: Table<TData>
}

export function DataTableSearchInput<TData>({
  table,
}: DataTableSearchInputProps<TData>) {
  return (
    <Input
      placeholder="Filter record by ID..."
      value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("id")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}
