"use client"

import { Link as ScrollLink } from "react-scroll"
import { NavbarActions } from "./NavbarActions"

export function NavbarLinks({ links, navbar, authenticated }) {
  return (
    <>
      {/* Backdrop */}
      {navbar.open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => navbar.setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm
          bg-background shadow-xl transition-transform duration-300
          flex flex-col
          lg:static lg:h-auto lg:w-auto lg:flex-row lg:items-center
          lg:shadow-none lg:translate-x-0
          ${navbar.open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 py-4 border-b lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => navbar.setOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-2 hover:bg-accent transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-1 px-5 pt-6 lg:flex-row lg:items-center lg:gap-6 lg:p-0">
          {links.map((link) => (
            <li key={link.name}>
              {link.id && navbar.isHomePage ? (
                <ScrollLink
                  to={link.id}
                  smooth
                  offset={-72}
                  duration={500}
                  onClick={() => {
                    navbar.navigate(link.id)
                    navbar.setOpen(false)
                  }}
                  className={linkClass(navbar.activeLink === link.id)}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <button
                  onClick={() => {
                    navbar.navigate(link.href ?? link.id)
                    navbar.setOpen(false)
                  }}
                  className={linkClass(navbar.activeLink === link.id)}
                >
                  {link.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile actions */}
        <div className="mt-auto px-5 py-6 border-t lg:hidden">
          <NavbarActions authenticated={authenticated} />
        </div>
      </aside>
    </>
  )
}

function linkClass(active) {
  return `
    block w-full rounded-md px-4 py-3 text-base font-medium transition
    ${
      active
        ? "border-b-2 border-accent text-accent-foreground font-semibold"
        : "text-muted-foreground hover:border-b-2 hover:border-accent hover:text-foreground"
    }
  `
}


function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
