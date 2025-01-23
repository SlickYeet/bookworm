"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/server/user"
import { SignUpSchema } from "@/validators"

// interface UserFormProps extends Partial<Book> {
//   type?: "create" | "update"
// }

export function UserForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      universityId: 0,
      studentId: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    const result = await createUser(values)
    if (result) {
      toast.success("User created successfully!")

      router.push("/admin/users")
    } else {
      toast.error("Oops! Something went wrong.", {
        description: "Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter the user's full name"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter the user's email"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="password"
                  placeholder="Enter the user's password"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="universityId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  University ID
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    placeholder="Enter the user's university ID"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Student ID
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the user's student ID"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="book-form_btn text-white"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          Create User
        </Button>
      </form>
    </Form>
  )
}
