"use client"

import Image from "next/image"

import { userOAuthOnboarding } from "@/server/user"
import { OAuthOnboardingSchema } from "@/validators"

import { OnboardingForm } from "./_components/onboarding-form"

export default function OnboardingPage() {
  return (
    <main className="auth-container">
      <div className="auth-box">
        <div className="flex flex-row gap-2">
          <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
          <h1 className="text-2xl font-semibold text-white">BookWorm</h1>
        </div>

        <OnboardingForm
          schema={OAuthOnboardingSchema}
          defaultValues={{
            universityId: 0,
            studentId: "",
          }}
          onSubmit={userOAuthOnboarding}
        />
      </div>
    </main>
  )
}
