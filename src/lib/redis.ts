import { Redis } from "@upstash/redis"

import { env } from "@/config"

export const redis = new Redis({
  url: env.upstash.redis.url,
  token: env.upstash.redis.token,
})
