"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
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

interface OAuthOnboardingFormProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ReturnType<User>>
}

export function OnboardingForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: OAuthOnboardingFormProps<T>) {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const isLoading = form.formState.isSubmitting

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data)
    if (result.success) {
      toast.success("Congratulations! Your profile has been finalized.")
    } else {
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        You are almost there! 🎉
      </h1>
      <p className="text-light-100">
        Welcome to the platform! Please fill out the form below to complete your
        onboarding process. You will receive an email once your profile is
        ready.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
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
                  <FormDescription>
                    {
                      FIELD_DESCRIPTION[
                        field.name as keyof typeof FIELD_DESCRIPTION
                      ]
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={isLoading} type="submit" className="form-btn">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Finalize Profile
          </Button>
        </form>
      </Form>
    </div>
  )
}
