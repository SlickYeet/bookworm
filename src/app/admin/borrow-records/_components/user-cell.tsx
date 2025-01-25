import { User } from "@prisma/client"
import Link from "next/link"

import { UserInfo } from "../../_components/user-info"

export function UserCell({ user }: { user: User }) {
  return (
    <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2">
      <UserInfo user={user} />
    </Link>
  )
}
