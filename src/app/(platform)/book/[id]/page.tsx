import { notFound } from "next/navigation"

import { BookOverview } from "@/components/book-overview"
import { VideoPlayer } from "@/components/video-player"
import { db } from "@/server/db"
import { getSession } from "@/server/session"

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { user } = await getSession()

  const bookDetails = await db.book.findUnique({
    where: { id },
  })
  if (bookDetails === null) return notFound()

  return (
    <>
      <BookOverview {...bookDetails} userId={user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Book Trailer</h3>
            <VideoPlayer videoUrl={bookDetails.videoUrl} />
          </section>

          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        {/* SIMILAR BOOKS */}
      </div>
    </>
  )
}
