import Link from "next/link"

import { Button } from "@/components/ui/button"

import { BookForm } from "./_components/book-form"

export default function NewBooksPage() {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  )
}
