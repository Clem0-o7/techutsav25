"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ProfileHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="flex items-center justify-between w-full mb-8">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your TechUtsav account</p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
        <Button
          variant="destructive"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
