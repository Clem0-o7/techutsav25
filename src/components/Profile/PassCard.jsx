"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PASS_DETAILS = {
  1: {
    name: "Pass 1 - Offline Workshop + All Events",
    price: "₹354",
    description: "Per Head - Inclusive of 18% GST",
    benefits: [
      "Offline (Physical) Workshop Access",
      "Access to All Events",
      "Shared Prize Pool",
    ],
    color: "from-red-500 to-pink-500",
  },
  2: {
    name: "Pass 2 - Online Paper Presentation",
    price: "₹118",
    description: "Per Head - Inclusive of 18% GST",
    benefits: [
      "Online Paper Presentation",
      "Shared Prize Pool",
      "Best Paper Award",
      "Papers Published with ISBN Number",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  3: {
    name: "Pass 3 - Online Idea Pitching",
    price: "₹118",
    description: "Per Team - Inclusive of 18% GST",
    benefits: [
      "Online Idea Pitching",
      "Shared Prize Pool",
      "Best Idea Award",
      "Creative Idea Award",
    ],
    color: "from-purple-500 to-indigo-500",
  },
  4: {
    name: "Pass 4 - Online Workshops",
    price: "₹118",
    description: "Per Head - Inclusive of 18% GST",
    benefits: ["Access to All Online Workshops"],
    color: "from-green-500 to-emerald-500",
  },
}

export function PassCard({ passType, purchasedPass, onBuyClick }) {
  const details = PASS_DETAILS[passType]

  const getStatusBadge = () => {
    if (!purchasedPass) {
      return (
        <Button
          onClick={() => onBuyClick(passType)}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          Buy Pass
        </Button>
      )
    }

    const statusConfig = {
      pending: {
        text: "Pending Verification",
        color: "bg-yellow-500/20 text-yellow-500 border-yellow-500",
      },
      verified: {
        text: "✓ Verified",
        color: "bg-green-500/20 text-green-500 border-green-500",
      },
      rejected: {
        text: "Rejected",
        color: "bg-red-500/20 text-red-500 border-red-500",
      },
    }

    const config = statusConfig[purchasedPass.status]

    return (
      <div className="space-y-2">
        <div
          className={`w-full py-3 px-4 rounded-lg border-2 text-center font-semibold ${config.color}`}
        >
          {config.text}
        </div>
        {purchasedPass.status === "rejected" && (
          <>
            {purchasedPass.rejectionReason && (
              <p className="text-sm text-red-400 text-center">
                Reason: {purchasedPass.rejectionReason}
              </p>
            )}
            <Button
              onClick={() => onBuyClick(passType)}
              className="w-full"
              variant="outline"
            >
              Resubmit Payment
            </Button>
          </>
        )}
        {purchasedPass.status === "pending" && (
          <p className="text-xs text-muted-foreground text-center">
            Verification typically takes 24-36 hours
          </p>
        )}
      </div>
    )
  }

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
      <CardHeader>
        <div
          className={`absolute top-0 left-0 right-0 h-2 rounded-t-lg bg-gradient-to-r ${details.color}`}
        />
        <CardTitle className="text-xl text-card-foreground pt-2">
          {details.name}
        </CardTitle>
        <CardDescription className="text-lg font-bold text-foreground">
          {details.price}
        </CardDescription>
        <CardDescription className="text-sm text-muted-foreground">
          {details.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-foreground">Benefits:</h4>
          <ul className="space-y-1">
            {details.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {getStatusBadge()}
      </CardContent>
    </Card>
  )
}
