import type { Metadata } from "next"
import LocalFont from "next/font/local"
import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const ibmPlexSans = LocalFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
})

const bebasNeue = LocalFont({
  src: [
    {
      path: "../../public/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebas-neue",
})

export const metadata: Metadata = {
  title: "BookWorm",
  description:
    "BookWorm is a book borrowing university library management solution.",
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    /**
     * ? The suppressHydrationWarning prop is here because of the `Bookmark Sidebar` Chrome extension.
     */
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.className} ${bebasNeue.variable}`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
