"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { VerifyEmailSchema } from "@/validators"

import { resendEmailVerificationCode, verifyEmail } from "../actions"

export function VerifyEmailForm({ email }: { email: string }) {
  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email,
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (values: z.infer<typeof VerifyEmailSchema>) => {
    const result = await verifyEmail(values)
    if (!result.success) {
      if (result.key === "verification_code_expired") {
        toast.info(result.message, {
          position: "bottom-left",
        })
      } else if (result.key === "no_verification_request_found") {
        toast.error(result.message, {
          position: "bottom-left",
          action: {
            label: "Resend email?",
            onClick: () => resendEmailVerificationCode(),
          },
        })
      } else {
        toast.error(result.message, {
          position: "bottom-left",
        })
      }
    } else {
      toast.success("Congratulations! Your profile has been finalized.", {
        position: "bottom-left",
      })
    }
  }

  const resendVerificationEmail = async () => {
    const result = await resendEmailVerificationCode()
    if (!result.success) {
      toast.error(result.message, {
        position: "bottom-left",
      })
    } else {
      toast.success(result.message, {
        position: "bottom-left",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">Last step!</h1>
      <p className="text-light-100">
        We just need to verify your email address. Please enter the code we sent
        to your email: <strong>{email}</strong>.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP disabled={isLoading} maxLength={6} {...field}>
                    <InputOTPGroup className="w-full">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="form-input_otp"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="form-btn">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Verify Email
          </Button>
        </form>
      </Form>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the email?
        <Button
          onClick={() => resendVerificationEmail()}
          type="button"
          size="sm"
          variant="link"
          className="px-1.5"
        >
          Resend Email
        </Button>
      </div>
    </div>
  )
}
