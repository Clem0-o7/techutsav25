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
