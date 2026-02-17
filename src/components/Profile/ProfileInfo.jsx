"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileInfo({ user }) {
  if (!user) return null

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Name" value={user.name} />
          <InfoItem label="Email" value={user.email} />
          <InfoItem label="Phone" value={user.phoneNo || "Not provided"} />
          <InfoItem label="College" value={user.college || "Not provided"} />
          <InfoItem label="Department" value={user.department || "Not provided"} />
          <InfoItem label="Year" value={user.year || "Not provided"} />
          <InfoItem 
            label="Email Verified" 
            value={user.isEmailVerified ? "Yes" : "No"}
            className={user.isEmailVerified ? "text-green-500" : "text-red-500"}
          />
          <InfoItem 
            label="Onboarding" 
            value={user.onboardingCompleted ? "Completed" : "Pending"}
            className={user.onboardingCompleted ? "text-green-500" : "text-yellow-500"}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value, className = "" }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={`text-base font-semibold text-foreground ${className}`}>
        {value}
      </p>
    </div>
  )
}
