"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PASS_NAMES = {
  1: "Pass 1 - Offline Workshop + All Events (₹354)",
  2: "Pass 2 - Online Paper Presentation (₹118)",
  3: "Pass 3 - Online Idea Pitching (₹118)",
  4: "Pass 4 - Online Workshops (₹118)",
}

export function PaymentModal({ isOpen, passType, onClose, onSubmit }) {
  const [transactionId, setTransactionId] = useState("")
  const [screenshot, setScreenshot] = useState(null)
  const [loading, setLoading] = useState(false)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTransactionId("")
      setScreenshot(null)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!transactionId.trim()) {
      alert("Please enter your transaction ID")
      return
    }

    if (!screenshot) {
      alert("Please upload a payment screenshot")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("passType", passType)
    formData.append("transactionId", transactionId)
    formData.append("screenshot", screenshot)

    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error("Payment submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-background border border-border rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Payment Submission
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {PASS_NAMES[passType]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Instructions */}
                <div className="p-4 bg-accent/20 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Payment Instructions:
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Pay the amount to the account details provided</li>
                  <li>Note down your transaction ID</li>
                  <li>Take a screenshot of the payment confirmation</li>
                  <li>Enter the transaction ID below</li>
                  <li>Upload the screenshot and submit</li>
                </ol>
                <Button
              type="button"
              className="w-full mt-4 text-lg font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 py-6 rounded-lg"
              onClick={() =>
                window.open(
                  "https://docs.google.com/document/d/1EDiuO0aRdf_rsBwmFYqepbbteHksEdLELRRVZWkl2Ws",
                  "_blank"
                )
              }
            >
              💳 Pay Now
            </Button>
                </div>

                {/* Transaction ID Input */}
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID *</Label>
            <Input
              id="transactionId"
              type="text"
              placeholder="Enter transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="bg-input border-border"
              required
            />
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-2">
            <Label htmlFor="screenshot">Payment Screenshot *</Label>
            <Input
              id="screenshot"
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="bg-input border-border"
              required
            />
            {screenshot && (
              <p className="text-xs text-muted-foreground">
                Selected: {screenshot.name}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
