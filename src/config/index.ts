export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
  authSecret: process.env.AUTH_SECRET!,
  imagekit: {
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  },
  upstash: {
    redis: {
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    },
    qStash: {
      url: process.env.QSTASH_URL!,
      token: process.env.QSTASH_TOKEN!,
    },
  },
  resend: {
    token: process.env.RESEND_TOKEN!,
    emailUser: process.env.EMAIL_USER!,
  },
}
