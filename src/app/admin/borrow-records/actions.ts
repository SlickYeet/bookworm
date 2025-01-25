"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/server/db"

export async function deleteBorrowRecord(id: string | string[]): Promise<void> {
  if (Array.isArray(id)) {
    const records = await db.borrowRecord.findMany({
      where: { id: { in: id } },
    })
    if (records.length === 0) {
      return
    }

    await db.borrowRecord.deleteMany({
      where: { id: { in: id } },
    })

    revalidatePath("/admin/borrow-records")

    return Promise.resolve()
  } else {
    const record = await db.borrowRecord.findUnique({
      where: { id },
    })
    if (record === null) {
      return
    }

    await db.borrowRecord.delete({
      where: { id },
    })

    revalidatePath("/admin/borrow-records")

    return Promise.resolve()
  }
}
