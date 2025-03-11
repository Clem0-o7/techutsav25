import MoreEventsClient from "@/components/MoreEventsClient";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/Event";

export default async function DepartmentEventsPage({ params }) {
  await connectToDatabase();
  const department = params.department;
  const events = await Event.find({ department }).lean();

  events.forEach((event) => {
    event._id = event._id.toString();
  });
  
  return <MoreEventsClient events={events} department={department} />;
}
