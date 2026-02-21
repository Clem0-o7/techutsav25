"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook to check authentication status
 * @returns {Object} - { authenticated: boolean, loading: boolean, user: object|null }
 */
export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include"
        })
        
        if (res.ok) {
          const data = await res.json()
          setAuthenticated(true)
          setUser(data.user)
        } else {
          setAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { authenticated, loading, user }
}
