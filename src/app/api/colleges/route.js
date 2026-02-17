import College from "@/lib/models/College"
import { NextResponse } from "next/server"

export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q") || ""

  const colleges = await College.find({
    name: { $regex: q, $options: "i" },
    approved: true,
  }).limit(10)

  return NextResponse.json(colleges)
}

export async function POST(req) {
  const { name } = await req.json()

  const college = await College.create({
    name,
    addedByUser: true,
    approved: false,
  })

  return NextResponse.json(college)
}
