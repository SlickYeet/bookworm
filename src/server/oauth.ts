import { GitHub, Google } from "arctic"

import { env } from "@/config"

export const google = new Google(
  env.oAuth.google.clientId,
  env.oAuth.google.clientSecret,
  env.oAuth.google.callbackUrl,
)

export const github = new GitHub(
  env.oAuth.github.clientId,
  env.oAuth.github.clientSecret,
  env.oAuth.github.callbackUrl,
)
