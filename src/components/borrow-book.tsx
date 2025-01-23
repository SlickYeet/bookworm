"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { borrowBook } from "@/actions/book"
import { Button } from "@/components/ui/button"

interface BorrowBookProps {
  bookId: string
  userId: string
  borrowingEligibility: {
    isEligible: boolean
    message: string
  }
}

export function BorrowBook({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: BorrowBookProps) {
  const router = useRouter()

  const [borrowing, setBorrowing] = useState<boolean>(false)

  const handleBorrow = async () => {
    if (!isEligible) {
      return toast.error("Oops!", {
        description: message,
      })
    }

    setBorrowing(true)

    const borrowDate = new Date()
    const dueDate = dayjs().add(30, "day").toDate()
    const returnDate = null

    try {
      const result = await borrowBook({
        bookId,
        userId,
        status: "BORROWED",
        borrowDate,
        dueDate,
        returnDate,
      })
      if (result.success) {
        toast.success("Success!", {
          description: "You can find the book under 'Borrowed Books'. Enjoy!",
        })

        router.push("/profile")
      } else {
        toast.error("Oops! Something went wrong.", {
          description: result.message,
        })
      }
    } catch {
      toast.error("Oops!", {
        description: "Something went wrong. Please try again later.",
      })
    } finally {
      setBorrowing(false)
    }
  }

  return (
    <Button
      disabled={borrowing}
      onClick={handleBorrow}
      className="book-overview_btn"
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  )
}
