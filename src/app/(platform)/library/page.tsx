import { GhostIcon } from "lucide-react"

import { BookList } from "@/components/book-list"
import { db } from "@/server/db"

export default async function LibraryPage() {
  const allBooks = await db.book.findMany()

  if (allBooks.length === 0) {
    return (
      <section className="library">
        <div className="flex flex-col items-center justify-center gap-y-2 text-white">
          <GhostIcon className="size-28" />
          <h1 className="library-title font-bebas-neue">
            It&apos;s so empty here...
          </h1>
          <p className="library-subtitle">
            This is not normal for a library.
            <br />
            Something must be wrong.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="library">
      <div className="flex flex-col gap-y-2 text-white">
        <h1 className="library-title font-bebas-neue">Our Full Library</h1>
        <p className="library-subtitle">All the books you can read.</p>
      </div>
      <ul>
        <BookList books={allBooks} />
      </ul>
    </section>
  )
}
