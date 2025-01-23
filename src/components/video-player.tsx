"use client"

import { IKVideo, ImageKitProvider } from "imagekitio-next"

import { env } from "@/config"

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  console.log("videoUrl", videoUrl)

  return (
    <ImageKitProvider
      urlEndpoint={env.imagekit.urlEndpoint}
      publicKey={env.imagekit.publicKey}
    >
      <IKVideo path={videoUrl} controls className="w-full rounded-xl" />
    </ImageKitProvider>
  )
}
