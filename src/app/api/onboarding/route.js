import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await req.json()

  await User.findByIdAndUpdate(session.user.id, {
    ...data,
    onboardingCompleted: true,
  })

  return NextResponse.json({ success: true })
}
