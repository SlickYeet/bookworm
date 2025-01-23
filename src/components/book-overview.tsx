import { type Book } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { db } from "@/server/db"

import { BookCover } from "./book-cover"
import { BorrowBook } from "./borrow-book"

interface BookOverviewProps extends Book {
  userId: string
}

export async function BookOverview({
  id,
  title,
  description,
  author,
  genre,
  rating,
  coverColor,
  coverUrl,
  totalCopies,
  availableCopies,
  userId,
}: BookOverviewProps) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies < 0
        ? "This book is not available at the moment."
        : "It seems like you have not been approved to borrow books yet, please contact support if you think this is a mistake.",
  }

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Genre <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        {user ? (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        ) : null}
      </div>

      <Link href={`/book/${id}`}>
        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <BookCover
              variant="lg"
              coverColor={coverColor}
              coverUrl={coverUrl}
              className="z-10"
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover
                variant="lg"
                coverColor={coverColor}
                coverUrl={coverUrl}
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
