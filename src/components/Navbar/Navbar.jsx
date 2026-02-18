"use client"

import { useNavbar } from "./useNavbar"
import { NAV_LINKS } from "@/config/navigation"
import { NavbarLogo } from "./NavbarLogo"
import { NavbarLinks } from "./NavbarLinks"
import { NavbarActions } from "./NavbarActions"
import { MobileMenuToggle } from "./MobileMenuToggle"

export function Navbar({ authenticated }) {
  const navbar = useNavbar()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav className="flex items-center justify-between px-6 py-3 shadow-sm max-w-[1920px] mx-auto">
        <NavbarLogo isHome={navbar.isHomePage} />

        {/* Mobile hamburger */}
        <MobileMenuToggle open={navbar.open} setOpen={navbar.setOpen} />

        {/* Links + mobile sidebar */}
        <NavbarLinks
          links={NAV_LINKS}
          navbar={navbar}
          authenticated={authenticated}
        />

        {/* Desktop-only actions */}
        <div className="hidden lg:block shrink-0">
          <NavbarActions authenticated={authenticated} />
        </div>
      </nav>
    </header>
  )
}
