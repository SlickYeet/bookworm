import type { User } from "@prisma/client"

export function Header({ user }: { user: User }) {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {user.fullName}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>

      <p>Search</p>
    </header>
  )
}
