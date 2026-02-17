import Event from '@/lib/models/Event';
import EventPageContent from './EventPageContent';
import { connectToDatabase } from '@/lib/mongodb';

export default async function EventPage({ params }) {
  const { uniqueName } = await params;
  await connectToDatabase();
  const event = await Event.findOne({ uniqueName }).lean();

  if (!event) {
    return <div>Event not found</div>;
  }

  // Convert _id to string if needed
  event._id = event._id.toString();

  return <EventPageContent event={event} />;
}
