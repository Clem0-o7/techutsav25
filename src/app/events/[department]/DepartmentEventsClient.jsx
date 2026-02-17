// "use client";

// import Link from "next/link";
// import styled from "styled-components";

// const PageContainer = styled.div`
//   padding: 3rem 5%;
//   background: #f4f8fc;
//   min-height: 100vh;
// `;

// const Title = styled.h1`
//   font-size: 36px;
//   color: #0b385f;
//   margin-bottom: 2.5rem;
//   text-align: center;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 2rem;
// `;

// const Card = styled.div`
//   background: white;
//   border-radius: 14px;
//   overflow: hidden;
//   box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
//   transition: all 0.25s ease;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-6px);
//     box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
//   }
// `;

// const Poster = styled.img`
//   width: 100%;
//   height: 260px;
//   object-fit: cover;
// `;

// const CardContent = styled.div`
//   padding: 1.2rem;
// `;

// const EventName = styled.h2`
//   font-size: 20px;
//   color: #0b385f;
//   margin-bottom: 0.5rem;
// `;

// const Abstract = styled.p`
//   font-size: 15px;
//   color: #444;
//   line-height: 1.5;
// `;

// export default function DepartmentEventsClient({ events, department }) {
//   return (
//     <PageContainer>
//       <Title>{department.toUpperCase()} Events</Title>

//       <Grid>
//         {events.map((event) => (
//           <Link
//             key={event._id}
//             href={`/event/${event.uniqueName}`}
//             style={{ textDecoration: "none" }}
//           >
//             <Card>
//               <Poster
//                 src={`https://clement2004.blob.core.windows.net/techutsav25/${event.uniqueName.toLowerCase()}.jpg`}
//                 alt={event.eventName}
//               />
//               <CardContent>
//                 <EventName>{event.eventName}</EventName>
//                 <Abstract>{event.eventAbstract}</Abstract>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </Grid>
//     </PageContainer>
//   );
// }
"use client";

import Link from "next/link";

export default function DepartmentEventsClient({ events, department }) {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
        {department.toUpperCase()} Events
      </h1>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event._id}
            href={`/event/${event.uniqueName}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              {/* Poster Wrapper - FLEX CENTERED (NO CROPPING) */}
              <div className="w-full h-72 flex items-center justify-center bg-gray-50 p-4">
                <img
                  src={`https://clement2004.blob.core.windows.net/techutsav25/${event.uniqueName.toLowerCase()}.jpg`}
                  alt={event.eventName}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  {event.eventName}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.eventAbstract}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
