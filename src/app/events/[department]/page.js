// import MoreEventsClient from "@/components/MoreEventsClient";
// import { connectToDatabase } from "@/lib/mongodb";
// import Event from "@/lib/models/Event";
// import Link from "next/link";
// // export default async function DepartmentEventsPage({ params }) {
// //   await connectToDatabase();
// //   const department = params.department;
// //   const events = await Event.find({ department }).lean();

// //   events.forEach((event) => {
// //     event._id = event._id.toString();
// //   });

// //   return <MoreEventsClient events={events} department={department} />;
// // }

// export default async function DepartmentEventsPage({ params }) {
//   const { department } = await params;

//   await connectToDatabase();

//   const events = await Event.find({ department }).lean();

//   return (
//     <div>
//       <h1>{department} Events</h1>

//       {events.map((event) => (
//         <Link key={event._id} href={`/event/${event.uniqueName}`}>
//           <div style={{ marginBottom: "30px", cursor: "pointer" }}>
//             {/* Poster */}
//             <img
//               src={`https://clement2004.blob.core.windows.net/techutsav25/${event.uniqueName}.jpg`}
//               alt={event.eventName}
//               width="250"
//               style={{ borderRadius: "10px" }}
//             />

//             {/* Event Name */}
//             <h2>{event.eventName}</h2>

//             {/* Short Description */}
//             <p>{event.eventAbstract}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import DepartmentEventsClient from "./DepartmentEventsClient";

export default async function DepartmentEventsPage({ params }) {
  const { department } = await params;

  await connectToDatabase();

  const events = await Event.find({
    department: { $regex: `^${department}$`, $options: "i" },
  }).lean();

  events.forEach((event) => {
    event._id = event._id.toString();
  });

  return <DepartmentEventsClient events={events} department={department} />;
}
