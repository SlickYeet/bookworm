"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { STATUS, type User } from "@prisma/client"
import { CheckIcon, ChevronsDownIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { manageAccountRequest } from "@/actions/book"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { cn, getInitials } from "@/lib/utils"
import { AccountRequestSchema } from "@/validators"

// interface BookFormProps extends Partial<Book> {
//   type?: "create" | "update"
// }

interface AccountRequestFormProps {
  users: User[]
}

export function AccountRequestForm({ users }: AccountRequestFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof AccountRequestSchema>>({
    resolver: zodResolver(AccountRequestSchema),
    defaultValues: {
      userId: "",
      status: "PENDING",
      message: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof AccountRequestSchema>) => {
    console.log({ values })

    const result = await manageAccountRequest(values)
    if (result.success) {
      toast.success(result.message)
      router.push("/admin/account-requests")
    } else {
      toast.error("Oops! Something went wrong.", {
        description: result.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      placeholder="Search for a book"
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No books found.</CommandEmpty>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.id}
                          onSelect={() => {
                            form.setValue("userId", user.id)
                          }}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Avatar>
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
                  {Object.values(STATUS).map((status) => (
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Message
              </FormLabel>
              <Textarea
                required
                placeholder="Enter a message"
                {...field}
                rows={10}
                className="book-form_input resize-none"
              />
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
          Add Book to Library
        </Button>
      </form>
    </Form>
  )
}
