import { LogOutIcon } from "lucide-react"

import { signOut } from "@/actions/auth"
import { BookList } from "@/components/book-list"
import { Button } from "@/components/ui/button"
import { sampleBooks } from "@/constants"
import { db } from "@/server/db"

export default async function ProfilePage() {
  const books = await db.book.findMany({
    take: 13,
    orderBy: { createdAt: "desc" },
  })

  const latestBooks = books.length > 0 ? books : sampleBooks

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

      <BookList title="Borrowed Books" books={latestBooks} />
    </>
  )
}
