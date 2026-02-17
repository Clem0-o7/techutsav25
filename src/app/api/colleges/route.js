import College from "@/lib/models/College"
import { connectToDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    await connectToDatabase()
    
    const q = new URL(req.url).searchParams.get("q") || ""

    const colleges = await College.find({
      name: { $regex: q, $options: "i" },
      approved: true,
    }).limit(10)

    return NextResponse.json(colleges)
  } catch (error) {
    console.error("Get colleges error:", error)
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectToDatabase()
    
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "College name is required" }, { status: 400 })
    }

    const college = await College.create({
      name,
      addedByUser: true,
      approved: false,
    })

    return NextResponse.json(college)
  } catch (error) {
    console.error("Create college error:", error)
    return NextResponse.json({ error: "Failed to create college" }, { status: 500 })
  }
}
