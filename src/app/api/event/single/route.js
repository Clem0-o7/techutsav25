import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function POST(req) {
  try {
    const { uniqueName } = await req.json();
    await connectToDatabase();
    const event = await Event.findOne({ uniqueName }).lean();
    if (!event) {
      return new Response(JSON.stringify({ msg: "NotFound" }), { status: 404 });
    }
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error" }), { status: 400 });
  }
}
