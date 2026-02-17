"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Events, scrollSpy, scroller } from "react-scroll"

export function useNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (!isHomePage) return

    Events.scrollEvent.register("begin", () => {})
    Events.scrollEvent.register("end", () => {})
    scrollSpy.update()

    return () => {
      Events.scrollEvent.remove("begin")
      Events.scrollEvent.remove("end")
    }
  }, [isHomePage])

  const navigate = (idOrHref) => {
    if (idOrHref.startsWith("/")) {
      router.push(idOrHref)
    } else if (!isHomePage) {
      router.push(`/#${idOrHref}`)
    } else {
      scroller.scrollTo(idOrHref, {
        smooth: "easeInOutQuart",
        duration: 800,
        offset: -72,
      })
    }

    setActiveLink(idOrHref)
    setOpen(false)
  }

  return {
    open,
    setOpen,
    activeLink,
    setActiveLink,
    navigate,
    isHomePage,
  }
}
