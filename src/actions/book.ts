"use server"

import type { Book, BORROW_STATUS, BorrowRecord } from "@prisma/client"
import dayjs from "dayjs"

import { db } from "@/server/db"
import { ReturnType } from "@/types"

export async function createBook(
  params: BookParams,
): Promise<ReturnType<Book>> {
  try {
    const newBook = await db.book.create({
      data: {
        ...params,
        availableCopies: params.totalCopies,
      },
    })

    return {
      success: true,
      message: "Book has been successfully created",
      key: "create_book_success",
      data: JSON.parse(JSON.stringify(newBook)),
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "An error occurred white creating the book",
      key: "create_book_error",
      data: null,
    }
  }
}

interface BorrowBookParams {
  bookId: string
  userId: string
  status?: BORROW_STATUS
  borrowDate?: Date
  dueDate?: Date
  returnDate?: Date | null
}

export async function borrowBook(
  params: BorrowBookParams,
): Promise<ReturnType<BorrowRecord>> {
  const { bookId, userId, status, borrowDate, dueDate, returnDate } = params

  try {
    const book = await db.book.findUnique({
      where: { id: bookId, availableCopies: { gt: 0 } },
      select: {
        availableCopies: true,
      },
    })
    if (book === null) {
      return {
        success: false,
        message:
          "The book is currently not available for borrowing at the moment",
        key: "book_not_available",
        data: null,
      }
    }

    const bookBorrowDate = borrowDate ? borrowDate : new Date()
    const bookDueDate = dueDate
      ? dueDate
      : dayjs().add(30, "day").toDate().toDateString()
    const bookReturnDate = returnDate ? returnDate : null

    const record = await db.borrowRecord.create({
      data: {
        bookId,
        userId,
        status: status ?? "BORROWED",
        borrowDate: bookBorrowDate,
        dueDate: bookDueDate,
        returnDate: bookReturnDate,
      },
    })

    await db.book.update({
      where: { id: bookId },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    })

    return {
      success: true,
      message: "The book has been successfully borrowed",
      key: "borrow_book_success",
      data: JSON.parse(JSON.stringify(record)),
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "An error occurred while trying to borrow the book",
      key: "borrow_book_error",
      data: null,
    }
  }
}
