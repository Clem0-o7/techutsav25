import { connectToDatabase } from "@/lib/mongodb"
import Event from "@/lib/models/Event"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    
    await connectToDatabase()

    // Build query based on search parameters
    const query = { isActive: true }
    
    // Search term
    const search = searchParams.get('search')
    if (search) {
      query.$text = { $search: search }
    }
    
    // Category filter
    const category = searchParams.get('category')
    if (category && category !== 'all') {
      query.category = category
    }
    
    // Department filter
    const departmentFilter = searchParams.get('departments')
    if (departmentFilter) {
      query.department = { $in: departmentFilter.split(',') }
    }
    
    // Tags filter
    const tags = searchParams.get('tags')
    if (tags) {
      query.tags = { $in: tags.split(',') }
    }
    
    // Event mode filter (online/offline)
    const eventMode = searchParams.get('eventMode')
    if (eventMode) {
      query.eventMode = { $in: eventMode.split(',') }
    }
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'priority'
    let sortQuery = {}
    
    switch (sortBy) {
      case 'name':
        sortQuery = { eventName: 1 }
        break
      case 'date':
        sortQuery = { eventDate: 1 }
        break
      case 'department':
        sortQuery = { department: 1 }
        break
      case 'priority':
      default:
        sortQuery = { priority: -1, createdAt: -1 }
        break
    }
    
    // Execute query
    const events = await Event.find(query)
      .sort(sortQuery)
      .limit(100) // Limit results for performance
      .lean()
    
    // Get aggregated data for filters
    const [departments, eventModes] = await Promise.all([
      Event.distinct("department", { isActive: true }),
      Event.distinct("eventMode", { isActive: true })
    ])
    
    // Serialize the events
    const serializedEvents = events.map(event => ({
      ...event,
      _id: event._id.toString(),
      eventDate: event.eventDate ? event.eventDate.toISOString() : null,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString()
    }))
    
    return NextResponse.json({
      success: true,
      events: serializedEvents,
      filters: {
        departments,
        eventModes
      },
      total: events.length
    })
    
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// Add search term suggestions endpoint
export async function POST(request) {
  try {
    const { searchTerm } = await request.json()
    
    if (!searchTerm || searchTerm.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }
    
    await connectToDatabase()
    
    // Get search suggestions
    const suggestions = await Event.aggregate([
      { 
        $match: { 
          isActive: true,
          $or: [
            { eventName: { $regex: searchTerm, $options: 'i' } },
            { department: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } }
          ]
        }
      },
      {
        $project: {
          suggestion: '$eventName',
          type: 'event',
          category: '$category'
        }
      },
      { $limit: 5 }
    ])
    
    return NextResponse.json({ suggestions })
    
  } catch (error) {
    console.error('Search suggestions error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get suggestions' },
      { status: 500 }
    )
  }
}