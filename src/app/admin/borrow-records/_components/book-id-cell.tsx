"use client"

import { CopyCheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function BookIdCell({ bookId }: { bookId: string }) {
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(bookId)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="flex items-center gap-2">
      <p className="max-w-40 truncate">{bookId}</p>
      <Button onClick={copyToClipboard} size="icon" variant="ghost">
        {copied ? <CopyCheckIcon className="text-green" /> : <CopyIcon />}
      </Button>
    </div>
  )
}
