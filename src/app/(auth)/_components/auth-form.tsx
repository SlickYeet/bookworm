"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form"
import { toast } from "sonner"
import { ZodType } from "zod"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FIELD_DESCRIPTION, FIELD_LABELS, FIELD_TYPES } from "@/constants"
import { ReturnType } from "@/types"

import { OAthButton } from "./oauth-button"

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP"
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ReturnType>
}

export function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) {
  const isSignIn = type === "SIGN_IN"

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const isLoading = form.formState.isSubmitting

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data)
    if (result.success) {
      toast.success(
        isSignIn ? "Signed in successfully" : "Signed up successfully",
        {
          description: isSignIn
            ? "Welcome back to BookWorm!"
            : "Access the vast collection of resources, and stay updated",
        },
      )
    } else {
      toast.error(
        `Oops! Error while ${isSignIn ? "signing in" : "signing up"}`,
        {
          description: result.message,
        },
      )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome back to BookWorm!"
          : "Create your library account."}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid student ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-4 w-full space-y-6"
        >
          <div className="flex justify-between gap-4">
            <OAthButton provider="GOOGLE" />
            <div className="w-px bg-primary" />
            <OAthButton provider="GITHUB" />
          </div>

          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_LABELS[field.name as keyof typeof FIELD_LABELS]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "studentId" ? (
                      <FileUpload
                        placeholder="Upload your student ID"
                        folder="ids"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  {!isSignIn ? (
                    <FormDescription>
                      {
                        FIELD_DESCRIPTION[
                          field.name as keyof typeof FIELD_DESCRIPTION
                        ]
                      }
                    </FormDescription>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={isLoading} type="submit" className="form-btn">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWorm?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary hover:underline"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}
