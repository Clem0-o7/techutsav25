"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProfileHeader } from "@/components/Profile/ProfileHeader"
import { ProfileInfo } from "@/components/Profile/ProfileInfo"
import { ProfileQRCode } from "@/components/Profile/ProfileQRCode"
import { PaymentSection } from "@/components/Profile/PaymentSection"
import { SubmissionSection } from "@/components/Profile/SubmissionSection"
import MainLoader from "@/components/MainLoader"
import { SnackbarComponent } from "@/components/SnackbarComponent"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "green"
  })

  const showSnackbar = (message, color = "green") => {
    setSnackbar({ open: true, message, color })
  }

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/profile/getProfile", {
        credentials: "include"
      })

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login")
          return
        }
        throw new Error("Failed to fetch profile")
      }

      const data = await res.json()
      setUser(data)
    } catch (error) {
      console.error("Profile fetch error:", error)
      showSnackbar("Failed to load profile", "red")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handlePaymentSubmit = async (formData) => {
    try {
      const res = await fetch("/api/profile/submit-payment", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Payment submission failed")
      }

      showSnackbar("Payment details submitted successfully! Awaiting verification.", "green")
      
      // Refresh profile data
      await fetchProfile()
    } catch (error) {
      console.error("Payment submission error:", error)
      showSnackbar(error.message || "Failed to submit payment", "red")
      throw error
    }
  }

  if (loading) {
    return <MainLoader />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Profile not found</h2>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProfileHeader />

        <div className="max-w-4xl mx-auto space-y-6">
          <ProfileInfo user={user} />
          <ProfileQRCode userId={user.id} passes={user.passes} userName={user.name} />
          <PaymentSection user={user} onPaymentSubmit={handlePaymentSubmit} />
          <SubmissionSection user={user} onDataRefresh={fetchProfile} />
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>QR code is generated only after pass verification - use it for event check-ins</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Paper Presentation requires Pass 2, Ideathon requires Pass 3 for submissions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Teams: Ideathon max 2 members, Paper Presentation allows multiple authors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>File limits: Paper (10MB, PDF/DOC), Ideathon (20MB, PDF/PPT)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Submission deadlines: Papers Feb 25, Ideathon Feb 24</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Payment verification typically takes 24-36 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>All pass fees are inclusive of 18% GST and non-refundable</span>
            </li>
          </ul>
        </div>
      </div>

      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        messageBack={snackbar.color}
        setOpen={(open) => setSnackbar({ ...snackbar, open })}
      />
    </div>
  )
}
