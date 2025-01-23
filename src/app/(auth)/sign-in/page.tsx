"use client"

import { SignInSchema } from "@/validators"

import { AuthForm } from "../_components/auth-form"
import { signIn } from "./actions"

export default function SignInPage() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signIn}
    />
  )
}
