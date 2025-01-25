import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import github from "../../../../public/icons/github.svg"
import google from "../../../../public/icons/google.svg"

interface OAthButtonProps {
  provider: "GOOGLE" | "GITHUB"
}

export function OAthButton({ provider }: OAthButtonProps) {
  return (
    <Link
      href={`/oauth/${provider.toLowerCase()}`}
      className={buttonVariants({
        variant: "transparent",
        className: "w-full text-primary hover:bg-primary hover:text-foreground",
      })}
    >
      {provider === "GOOGLE" ? (
        <Image src={google} alt="google" width={25} />
      ) : (
        <Image src={github} alt="github" width={25} />
      )}
      <span className="font-semibold">{provider}</span>
    </Link>
  )
}
