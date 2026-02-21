import { connectToDatabase } from "@/lib/mongodb"
import Event from "@/lib/models/Event"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    await connectToDatabase()
    
    const { id } = params
    
    // Try to find event by _id or uniqueName
    let event = await Event.findOne({ 
      $or: [
        { _id: id },
        { uniqueName: id }
      ],
      isActive: true 
    })
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Event fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}