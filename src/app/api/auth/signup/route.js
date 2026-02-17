import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import User from "@/models/User"
import { sendVerificationEmail } from "@/lib/mail"

export async function POST(req) {
  const { name, email, password, confirmPassword } = await req.json()

  if (password !== confirmPassword)
    return NextResponse.json({ error: "Passwords mismatch" }, { status: 400 })

  const hashed = await bcrypt.hash(password, 12)
  const token = crypto.randomBytes(32).toString("hex")

  const user = await User.create({
    name,
    email,
    password: hashed,
    emailVerificationToken: token,
    emailVerificationExpires: Date.now() + 1000 * 60 * 60 * 24,
  })

  await sendVerificationEmail(email, token)

  return NextResponse.json({ success: true })
}
