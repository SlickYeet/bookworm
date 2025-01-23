import { zodResolver } from "@hookform/resolvers/zod"
import { BORROW_STATUS, BorrowRecord } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BorrowRecordSchema } from "@/validators"
import { updateBorrowRecord } from "@/actions/book"
import { toast } from "sonner"

export function StatusCell(borrowRecord: BorrowRecord) {
  const form = useForm<z.infer<typeof BorrowRecordSchema>>({
    resolver: zodResolver(BorrowRecordSchema),
    defaultValues: {
      userId: borrowRecord.userId,
      bookId: borrowRecord.bookId,
      status: borrowRecord.status,
      borrowDate: borrowRecord.borrowDate,
      dueDate: borrowRecord.dueDate,
      returnDate: borrowRecord.returnDate,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof BorrowRecordSchema>) => {
    const resposne = await updateBorrowRecord(values)
    if (resposne.success) {
      toast.success(resposne.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                form.handleSubmit(onSubmit)()
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(BORROW_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </form>
    </Form>
  )
}
