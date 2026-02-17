"use client"

import { useRouter } from "next/navigation"

export function NavbarActions({ authenticated }) {
  const router = useRouter()

  return authenticated ? (
    <button
      onClick={() => router.push("/profile")}
      className="rounded-md border border-primary px-5 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition"
    >
      Profile
    </button>
  ) : (
    <button
      onClick={() => router.push("/profile")}
      className="rounded-md border border-primary px-5 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition"
    >
      Sign In / Sign Up
    </button>
  )
}
