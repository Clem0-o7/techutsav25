import MoreEventsClient from '@/components/MoreEventsClient';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/lib/models/Event';

{/* */}
export default async function MoreEventsPage({ params }) {
  const { department } = params;
  await connectToDatabase();
  let events;
  if (department === 'All') {
    events = await Event.find({}).lean();
  } else {
    events = await Event.find({ department }).lean();
  }
  // JSON.parse/stringify to safely pass Mongoose data to the client.
  return <MoreEventsClient events={JSON.parse(JSON.stringify(events))} department={department} />;
}
