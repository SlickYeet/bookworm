import { User } from "@prisma/client"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export function UserCell({ user }: { user: User }) {
  return (
    <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback className="bg-amber-100">
          {getInitials(user.fullName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col max-md:hidden">
        <p className="max-w-32 truncate font-semibold text-dark-200">
          {user.fullName}
        </p>
        <p className="text-xs text-light-500">{user.email}</p>
      </div>
    </Link>
  )
}
