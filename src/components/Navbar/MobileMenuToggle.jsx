"use client"

export function MobileMenuToggle({ open, setOpen }) {
  return (
    <button
      aria-label="Toggle navigation menu"
      onClick={() => setOpen(!open)}
      className="
        lg:hidden
        ml-auto
        inline-flex
        items-center
        justify-center
        rounded-md
        border
        border-border
        p-2
        text-foreground
        hover:bg-accent
        transition
      "
    >
      {open ? <CloseIcon /> : <MenuIcon />}
    </button>
  )
}



function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
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



