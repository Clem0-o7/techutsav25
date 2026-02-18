"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ProfileHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include" 
      })
      
      if (response.ok) {
        // Clear any client-side storage if needed
        localStorage.clear()
        sessionStorage.clear()
        
        // Redirect to home page
        router.push("/")
        router.refresh() // Force refresh to clear any cached data
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Even if there's an error, try to redirect
      router.push("/")
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
