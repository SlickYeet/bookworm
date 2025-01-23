import { Book } from "@prisma/client"

import { BookCard } from "@/components/book-card"

interface BookListProps {
  title?: string
  books: Book[]
  className?: string
}

export function BookList({ title, books, className }: BookListProps) {
  if (books.length < 2) return

  return (
    <section className={className}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  )
}
