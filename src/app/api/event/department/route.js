import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function POST(req) {
  try {
    const { departmentName } = await req.json();
    await connectToDatabase();
    let events;
    if (departmentName === "All") {
      events = await Event.find({}).lean();
    } else {
      events = await Event.find({ department: departmentName }).lean();
    }
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), { status: 400 });
  }
}
