import { NextResponse } from "next/server"
import User from "@/models/User"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() },
  })

  if (!user)
    return NextResponse.redirect("/auth/invalid-token")

  user.isEmailVerified = true
  user.emailVerificationToken = undefined
  user.emailVerificationExpires = undefined
  await user.save()

  return NextResponse.redirect("/onboarding")
}
