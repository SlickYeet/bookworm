import { Book } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { BookCover } from "@/components/book-cover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BookCard({ id, title, genre, coverColor, coverUrl }: Book) {
  const isLoaned = false

  return (
    <li className={cn(isLoaned && "w-full xs:w-52")}>
      <Link
        href={`/book/${id}`}
        className={cn(isLoaned && "flex w-full flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />

        <div className={cn("mt-4", !isLoaned && "max-w-28 xs:max-w-44")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoaned && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>

            <Button variant="link" className="book-btn">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  )
}
