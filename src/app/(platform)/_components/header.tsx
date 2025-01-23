"use client"

import type { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

export function Header({ user }: { user: User }) {
  const pathname = usePathname()

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex flex-row gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="mt-1 text-2xl font-semibold text-white">BookWorm</h1>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>

        {/* <li>
          <Link
            href="/search"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathname === "/search" ? "text-light-200" : "text-light-100",
            )}
          >
            Search
          </Link>
        </li> */}

        {user ? (
          <li>
            <Link href="/profile" className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-primary">
                  {getInitials(user?.fullName ?? "")}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "text-base font-semibold capitalize",
                  pathname === "/profile" ? "text-light-200" : "text-light-100",
                )}
              >
                {user?.fullName}
              </span>
            </Link>
          </li>
        ) : null}
      </ul>
    </header>
  )
}
