"use client"

import { SignUpSchema } from "@/validators"

import { AuthForm } from "../_components/auth-form"
import { signUp } from "./actions"

export default function SignUpPage() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        studentId: "",
      }}
      onSubmit={signUp}
    />
  )
}
