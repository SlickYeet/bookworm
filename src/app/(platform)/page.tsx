import { db } from "@/server/db"
import { getSession } from "@/server/session"

import { BookList } from "@/components/book-list"
import { BookOverview } from "@/components/book-overview"
import { sampleBooks } from "@/constants"

export default async function HomePage() {
  const { session } = await getSession()

  const books = await db.book.findMany({
    take: 13,
    orderBy: { createdAt: "desc" },
  })

  const latestBooks = books.length > 0 ? books : sampleBooks

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.userId as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        className="mt-28"
      />
    </>
  )
}
