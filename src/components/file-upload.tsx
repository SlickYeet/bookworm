"use client"

import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next"
import Image from "next/image"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { env } from "@/config"
import { cn } from "@/lib/utils"

const {
  imagekit: { urlEndpoint, publicKey },
} = env

async function authenticator() {
  try {
    const response = await fetch(`${env.apiEndpoint}/imagekit`)

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      )
    }

    const data = await response.json()

    const { signature, expire, token } = data

    return { token, expire, signature }
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`)
  }
}

interface FileUploadProps {
  type?: "image" | "video"
  accept?: "image/*" | "video/*"
  placeholder: string
  folder: string
  variant?: "dark" | "light"
  value?: string
  onFileChange: (filePath: string) => void
}

export function FileUpload({
  type = "image",
  accept = "image/*",
  placeholder,
  folder,
  variant = "dark",
  value,
  onFileChange,
}: FileUploadProps) {
  const ikUploadRef = useRef(null)

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  })
  const [progress, setProgress] = useState<number>(0)

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  }

  const onSuccess = (res: { filePath: string }) => {
    setFile(res)
    onFileChange(res.filePath)

    toast.success(`${type} uploaded`, {
      description: `${res.filePath} uploaded successfully!`,
      classNames: {
        title: "capitalize",
      },
    })
  }

  const onError = (error: { message: string }) => {
    console.error(`Error uploading ${type}:`, error.message)

    toast.error(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
      classNames: {
        title: "capitalize",
      },
    })
  }

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Your file is too large", {
          description: "Please upload a file smaller than 20MB.",
        })

        return false
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Your file is too large", {
          description: "Please upload a file smaller than 50MB.",
        })

        return false
      }
    }

    return true
  }

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100)
          setProgress(percent)
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        onClick={(e) => {
          e.preventDefault()

          if (ikUploadRef.current) {
            // @ts-expect-error: ikUploadRef is not null
            ikUploadRef.current?.click()
          }
        }}
        className={cn("upload-btn", styles.button)}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p
          className={cn("text-base", styles.placeholder, {
            hidden: file && file.filePath,
          })}
        >
          {placeholder}
        </p>

        {file ? (
          <p
            className={cn(
              "upload-filename max-w-[300px] truncate",
              styles.text,
            )}
          >
            {file.filePath}
          </p>
        ) : null}
      </button>

      {progress > 0 && progress !== 100 ? (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            ${progress}% uploaded
          </div>
        </div>
      ) : null}

      {file && file.filePath ? (
        type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null
      ) : null}
    </ImageKitProvider>
  )
}
