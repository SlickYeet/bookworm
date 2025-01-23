import ImageKit from "imagekit"
import { NextResponse } from "next/server"

import { env } from "@/config"

const {
  imagekit: { urlEndpoint, publicKey, privateKey },
} = env

const imagekit = new ImageKit({ urlEndpoint, publicKey, privateKey })

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters())
}
