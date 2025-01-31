import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { BookForm } from "./_components/book-form"

export default function NewBookPage() {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">
          <ChevronLeftIcon />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  )
}
