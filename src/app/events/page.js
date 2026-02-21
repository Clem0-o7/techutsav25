"use client"

import { useEffect, useState } from "react"
import { EventsAppSidebar } from "@/components/events-app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import EventsGrid from "./EventsGrid"
import { Calendar } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    departments: [],
    eventModes: []
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        const data = await res.json()
        setEvents(data.events || [])
        setFilteredEvents(data.events || [])
      } catch (error) {
        console.error("Error fetching events:", error)
        setEvents([])
        setFilteredEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    // Apply search filter on eventName and eventAbstract
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(event =>
        event.eventName?.toLowerCase().includes(searchLower) ||
        event.eventAbstract?.toLowerCase().includes(searchLower) ||
        event.eventDesp?.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    // Apply department filter
    if (filters.departments.length > 0) {
      filtered = filtered.filter(event => 
        filters.departments.includes(event.department)
      )
    }

    // Apply event mode filter
    if (filters.eventModes.length > 0) {
      filtered = filtered.filter(event => 
        filters.eventModes.includes(event.eventMode)
      )
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Calendar className="animate-spin h-8 w-8 mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <EventsAppSidebar 
        filters={filters} 
        onFiltersChange={setFilters}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Events</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <div className="text-sm text-muted-foreground">
              {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Events</h1>
              <p className="text-muted-foreground">
                Discover and participate in TechUtsav 2026 events
              </p>
            </div>
            
            <EventsGrid events={filteredEvents} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}