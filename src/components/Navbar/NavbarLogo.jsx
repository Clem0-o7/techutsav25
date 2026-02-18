"use client"

import Link from "next/link"
import Image from "next/image"
import { Link as ScrollLink } from "react-scroll"

export function NavbarLogo({ isHome }) {
  const LogoContent = (
    <div className="flex items-center gap-2 select-none shrink-0">
      <Image
        src="/logos/tce_logo.png"
        alt="TCE Logo"
        width={50}
        height={50}
        priority
      />
    </div>
  )

  if (isHome) {
    return (
      <ScrollLink
        to="home"
        smooth
        offset={-72}
        duration={600}
        className="cursor-pointer"
      >
        {LogoContent}
      </ScrollLink>
    )
  }

  return (
    <Link href="/" className="select-none">
      {LogoContent}
    </Link>
  )
}
