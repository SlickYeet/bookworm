import { Table } from "@tanstack/react-table"
import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>
  rowSelection: object
  setRowSelection: (rowSelection: object) => void
  action: (ids: string[]) => Promise<void>
}

export function DataTableBulkActions<TData>({
  table,
  rowSelection,
  setRowSelection,
  action,
}: DataTableBulkActionsProps<TData>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleBulkAction = async (ids: string[]) => {
    setIsLoading(true)
    try {
      await action(ids)
      toast.success("Bulk action completed")
    } catch (error) {
      console.error(error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
      setRowSelection({})
    }
  }

  return (
    <>
      {Object.keys(rowSelection).length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
              <span>({Object.keys(rowSelection).length})</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to delete {Object.keys(rowSelection).length}{" "}
                record(s). This will permanently delete the record(s), this
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="mr-auto">Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={() =>
                  handleBulkAction(
                    table
                      .getSelectedRowModel()
                      .rows.map((row) => (row.original as { id: string }).id),
                  )
                }
                className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : null}
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
