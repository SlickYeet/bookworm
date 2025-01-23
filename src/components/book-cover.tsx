"use client"

import { IKImage } from "imagekitio-next"

import { BookCoverSvg } from "@/components/book-cover-svg"
import { env } from "@/config"
import { cn } from "@/lib/utils"
import Image from "next/image"

type BookCoverVariant = "xs" | "sm" | "md" | "default" | "lg"

const bookCardVariantStyles: Record<BookCoverVariant, string> = {
  xs: "book-cover_xs",
  sm: "book-cover_sm",
  md: "book-cover_md",
  default: "book-cover",
  lg: "book-cover_lg",
}

interface BookCoverProps {
  variant?: BookCoverVariant
  coverColor: string
  coverUrl: string
  className?: string
}

export function BookCover({
  variant = "default",
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
  className,
}: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        bookCardVariantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{
          left: "12%",
          width: "87.5%",
          height: "88%",
        }}
      >
        {!coverUrl.startsWith("https") ? (
          <IKImage
            path={coverUrl}
            urlEndpoint={env.imagekit.urlEndpoint}
            alt="Book cover"
            fill
            loading="lazy"
            lqip={{ active: true }}
            className="rounded-sm object-fill"
          />
        ) : (
          <Image
            src={coverUrl}
            alt="Book cover"
            fill
            loading="lazy"
            className="rounded-sm object-fill"
          />
        )}
      </div>
    </div>
  )
}
