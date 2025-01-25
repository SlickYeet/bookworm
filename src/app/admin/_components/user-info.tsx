import { User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export function UserInfo({ user }: { user: User }) {
  return (
    <>
      <Avatar>
        {user.pictureUrl ? <AvatarImage src={user.pictureUrl} /> : null}
        <AvatarFallback className="bg-amber-100">
          {getInitials(user.fullName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col max-md:hidden">
        <p className="font-semibold text-dark-200">{user.fullName}</p>
        <p className="text-xs text-light-500">{user.email}</p>
      </div>
    </>
  )
}
