"use client"

import { useMemo, useState } from "react"
import { Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar"
import EventsSidebar from "@/components/events-sidebar"
import EventCard from "./EventCard"

export default function EventsPageClient({ events }) {
  const [filters, setFilters] = useState({
    category: "all",
    departments: [],
    eventModes: [],
    tags: []
  })

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (!event.isActive) return false

      if (filters.category !== "all" && event.category !== filters.category)
        return false

      if (
        filters.departments.length &&
        !filters.departments.includes(event.department)
      )
        return false

      if (
        filters.eventModes.length &&
        !filters.eventModes.includes(event.eventMode)
      )
        return false

      if (
        filters.tags.length &&
        !event.tags.some(tag => filters.tags.includes(tag))
      )
        return false

      return true
    })
  }, [events, filters])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="border-r">
        <SidebarContent>
          <EventsSidebar
            filters={filters}
            onFiltersChange={setFilters}
          />
        </SidebarContent>
      </Sidebar>

      {/* Main content */}
      <SidebarInset className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Events</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <p className="text-gray-500 mt-12 text-center">
              No events match the selected filters.
            </p>
          )}
        </div>
      </SidebarInset>
    </div>
  )
}