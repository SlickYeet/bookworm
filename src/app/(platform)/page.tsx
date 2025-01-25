import { db } from "@/server/db"
import { getSession } from "@/server/session"
import Image from "next/image"

import { BookList } from "@/components/book-list"
import { BookOverview } from "@/components/book-overview"

import NoBooks from "../../../public/images/no-books.png"

export default async function HomePage() {
  const { session } = await getSession()

  const latestBooks = await db.book.findMany({
    take: 13,
    orderBy: { createdAt: "desc" },
  })
  if (latestBooks.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <Image src={NoBooks} alt="no book" width={300} height={300} />
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-white">
            No Results Found
          </h1>
          <p className="text-center text-light-100">
            We couldn&apos;t find any books at the moment.
            <br />
            Please check back later for new books.
          </p>
        </div>
      </div>
    )
  }

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
