import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({ flagship: true }).lean();
    const mapped = events.map(e => ({
      uniqueName: e.uniqueName,
      eventName: e.eventName,
      eventAbstract: e.eventAbstract
    }));
    return new Response(JSON.stringify(mapped), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), { status: 400 });
  }
}
