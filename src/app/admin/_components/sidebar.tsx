"use client"

import type { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { adminSideBarLinks } from "@/constants"
import { cn } from "@/lib/utils"

import { UserInfo } from "./user-info"

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname()

  return (
    <div className="admin-sidebar">
      <div>
        <Link href="/admin" className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            width={37}
            height={37}
          />
          <h1>BookWorm</h1>
        </Link>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route

            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm",
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""}`}
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="user">
        <UserInfo user={user} />
      </div>
    </div>
  )
}
