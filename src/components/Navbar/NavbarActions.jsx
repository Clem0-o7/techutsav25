"use client"

import { useRouter } from "next/navigation"
import { User } from "lucide-react"

export function NavbarActions({ authenticated }) {
  const router = useRouter()

  return authenticated ? (
    <button
      onClick={() => router.push("/profile")}
      className="flex items-center gap-2 rounded-md border border-primary px-5 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition font-medium"
    >
      <User className="w-4 h-4" />
      Profile
    </button>
  ) : (
    <button
      onClick={() => router.push("/login")}
      className="rounded-md border border-primary px-5 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition font-medium"
    >
      Login / Register
    </button>
  )
}
