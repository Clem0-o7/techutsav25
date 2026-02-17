"use client"

import { useState } from "react"
import { PassCard } from "./PassCard"
import { PaymentModal } from "./PaymentModal"

export function PaymentSection({ user, onPaymentSubmit }) {
  const [selectedPass, setSelectedPass] = useState(null)

  // Get purchased pass for a specific passType
  const getPurchasedPass = (passType) => {
    if (!user?.passes || user.passes.length === 0) return null
    return user.passes.find((pass) => pass.passType === passType)
  }

  // Handle buy pass click
  const handleBuyClick = (passType) => {
    setSelectedPass(passType)
  }

  // Handle modal close
  const handleModalClose = () => {
    setSelectedPass(null)
  }

  // Handle payment submission
  const handlePaymentSubmit = async (formData) => {
    await onPaymentSubmit(formData)
    setSelectedPass(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Choose Your Pass
        </h2>
        <p className="text-muted-foreground">
          Select and purchase passes to access events and workshops. Each pass can be bought once.
        </p>
      </div>

      {/* Pass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((passType) => (
          <PassCard
            key={passType}
            passType={passType}
            purchasedPass={getPurchasedPass(passType)}
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={selectedPass !== null}
        passType={selectedPass}
        onClose={handleModalClose}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  )
}
