import { zodResolver } from "@hookform/resolvers/zod"
import { BORROW_STATUS, BorrowRecord } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { updateBorrowRecord } from "@/actions/book"
import { Form, FormControl, FormField } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BorrowRecordSchema } from "@/validators"

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
                const returnDate = form.watch("returnDate")
                if (value === BORROW_STATUS.RETURNED && !returnDate) {
                  form.setValue("returnDate", new Date())
                } else if (value === BORROW_STATUS.BORROWED) {
                  form.setValue("returnDate", null)
                }
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
                    <span
                      className={
                        status === BORROW_STATUS.RETURNED
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {status}
                    </span>
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
