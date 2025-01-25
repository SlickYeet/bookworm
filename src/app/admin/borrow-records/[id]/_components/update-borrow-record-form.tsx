"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  BORROW_STATUS,
  BorrowRecord,
  type Book,
  type User,
} from "@prisma/client"
import { format } from "date-fns"
import dayjs from "dayjs"
import {
  CalendarIcon,
  CheckIcon,
  ChevronsDownIcon,
  Loader2,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { updateBorrowRecord } from "@/actions/book"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, getInitials } from "@/lib/utils"
import { BorrowRecordSchema } from "@/validators"

type BorrowRecordWithRelations = BorrowRecord & {
  user: User
  book: Book
}

interface UpdateBorrowRecordFormProps {
  record: BorrowRecordWithRelations
  users: User[]
  books: Book[]
}

export function UpdateBorrowRecordForm({
  record,
  users,
  books,
}: UpdateBorrowRecordFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof BorrowRecordSchema>>({
    resolver: zodResolver(BorrowRecordSchema),
    defaultValues: {
      userId: record.userId,
      bookId: record.bookId,
      status: record.status,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
      returnDate: record.returnDate,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof BorrowRecordSchema>) => {
    const result = await updateBorrowRecord(values)
    if (result.success) {
      toast.success(result.message)

      router.push("/admin/borrow-records")
    } else {
      toast.error("Oops! Something went wrong.", {
        description: result.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* userId */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                User
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="book-form_input justify-between"
                    >
                      {field.value
                        ? users.find((user) => user.id === field.value)
                            ?.fullName
                        : "Select a user"}
                      <ChevronsDownIcon className="opacity-30" />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent align="start" className="md:w-[42rem]">
                  <Command>
                    <CommandInput
                      placeholder="Search for a user"
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.fullName}
                          onSelect={() => {
                            form.setValue("userId", user.id)
                          }}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Avatar>
                            {user.pictureUrl ? (
                              <AvatarImage src={user.pictureUrl} />
                            ) : null}
                            <AvatarFallback className="bg-amber-100">
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col max-md:hidden">
                            <p className="font-semibold text-dark-200">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-light-500">
                              {user.email}
                            </p>
                          </div>
                          <CheckIcon
                            className={cn(
                              "ml-auto",
                              user.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* book */}
        <FormField
          control={form.control}
          name="bookId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="book-form_input justify-between"
                    >
                      {field.value
                        ? books.find((book) => book.id === field.value)?.title
                        : "Select a book"}
                      <ChevronsDownIcon className="opacity-30" />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent align="start" className="md:w-[42rem]">
                  <Command>
                    <CommandInput
                      placeholder="Search for a book"
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No books found.</CommandEmpty>
                      {books.map((book) => (
                        <CommandItem
                          key={book.id}
                          value={book.title}
                          onSelect={() => {
                            form.setValue("bookId", book.id)
                          }}
                        >
                          <p className="w-full cursor-pointer items-center rounded-sm py-2 text-base">
                            {book.title}
                          </p>
                          <CheckIcon
                            className={cn(
                              "ml-auto",
                              book.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Status
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="book-form_input">
                    <SelectValue placeholder="Select the book's status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(BORROW_STATUS).map((status) => (
                    <SelectItem key={status} value={status}>
                      <p className="cursor-pointer items-center rounded-sm py-2 text-base capitalize">
                        {status.toLowerCase()}
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          {/* borrowDate */}
          <FormField
            control={form.control}
            name="borrowDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Borrow Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="book-form_input w-full"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date the book was borrowed from the library.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* dueDate */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Due Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="book-form_input w-full"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      footer={
                        <div className="flex justify-center gap-2">
                          <Button
                            onClick={() =>
                              form.setValue(
                                "dueDate",
                                dayjs(form.watch("borrowDate"))
                                  .add(7, "day")
                                  .toDate(),
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            7 days
                          </Button>
                          <Button
                            onClick={() =>
                              form.setValue(
                                "dueDate",
                                dayjs(form.watch("borrowDate"))
                                  .add(14, "day")
                                  .toDate(),
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            14 days
                          </Button>
                          <Button
                            onClick={() =>
                              form.setValue(
                                "dueDate",
                                dayjs(form.watch("borrowDate"))
                                  .add(30, "day")
                                  .toDate(),
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            30 days
                          </Button>
                        </div>
                      }
                      defaultMonth={form.watch("dueDate") ?? new Date()}
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= (form.watch("borrowDate") ?? new Date()) ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date the book is expected to be returned.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* returnDate */}
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-normal text-dark-500">
                  Returned Date
                </FormLabel>
                <Button
                  type="button"
                  onClick={() => field.onChange(null)}
                  size="sm"
                  variant="outline"
                >
                  <X />
                  Clear Date
                </Button>
              </div>
              <Popover>
                <PopoverTrigger
                  disabled={
                    form.watch("status") !== "RETURNED" ||
                    !form.watch("dueDate")
                  }
                  asChild
                >
                  <FormControl>
                    <Button
                      variant="outline"
                      className="book-form_input w-full"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= (form.watch("borrowDate") ?? new Date()) ||
                      date >= (form.watch("dueDate") ?? new Date()) ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="book-form_btn text-white"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          Update Borrow Record
        </Button>
      </form>
    </Form>
  )
}
