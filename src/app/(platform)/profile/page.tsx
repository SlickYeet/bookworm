import { ArrowRightIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { signOut } from "@/actions/auth"
import { BookList } from "@/components/book-list"
import { Button, buttonVariants } from "@/components/ui/button"
import { db } from "@/server/db"

import NoBooks from "../../../../public/images/no-books.png"

export default async function ProfilePage() {
  const latestBooks = await db.book.findMany({
    take: 13,
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <form
        action={async () => {
          "use server"

          await signOut()
        }}
        className="mb-10"
      >
        <Button>
          <LogOutIcon />
          Sign Out
        </Button>
      </form>

      {latestBooks.length === 0 ? (
        <div className="flex flex-col items-center space-y-6">
          <Image src={NoBooks} alt="no book" width={300} height={300} />
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-white">
              You haven&apos;t borrowed a book yet
            </h1>
            <p className="text-center text-light-100">
              Borrow a book from our vast collection of resources, and start
              reading today.
              <br />
              You can also check back at any time to see the latest books
              available.
            </p>
          </div>
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              variant: "default",
              className: "group",
            })}
          >
            Start Reading Now!
            <ArrowRightIcon className="transition-all group-hover:translate-x-2" />
          </Link>
        </div>
      ) : (
        <BookList title="Borrowed Books" books={latestBooks} />
      )}
    </>
  )
}
