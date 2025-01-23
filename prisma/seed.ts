import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import ImageKit from "imagekit"

import dummyBooks from "../dummybooks.json"

const prisma = new PrismaClient()

const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
})

async function uploadToImageKit(url: string, fileName: string, folder: string) {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    })
    return response.filePath
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error)
    throw error
  }
}

async function main() {
  console.log("Start seeding...")

  const password = await hash("Password1234!", 12)
  const user = await prisma.user.create({
    data: {
      id: "999",
      fullName: "Test User",
      email: "test@famlam.ca",
      password,
      status: "APPROVED",
      role: "ADMIN",
      universityId: 123123132,
      studentId: "/seed/ids/student-id.jpg",
    },
  })

  console.log({ user })

  console.log("Seeding books...")

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers",
      )

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos",
      )

      await prisma.book.create({
        data: {
          ...book,
          coverUrl,
          videoUrl,
        },
      })

      console.log(`Added book: ${book.title}`)
    }

    console.log("Seeding completed successfully.")
  } catch (error) {
    console.error("Error seeding books:", error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
