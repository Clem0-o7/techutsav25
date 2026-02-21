import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('techutsav26')
    
    let query
    
    // Try to find by ObjectId first, then by uniqueName
    try {
      query = { _id: new ObjectId(id) }
    } catch (error) {
      // If not a valid ObjectId, search by uniqueName
      query = { uniqueName: id }
    }
    
    const event = await db.collection('events').findOne(query)
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      event: event
    })

  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}