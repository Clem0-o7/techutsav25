"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export default function EventCard({ event }) {
  const eventDate = event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  }) : null
  const spotsLeft = event.maxTeamSize ? event.maxTeamSize - (event.registeredParticipants?.length || 0) : null

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {event.poster ? (
          <img
            src={event.poster}
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-40" />
              <span className="text-sm">Event Poster</span>
            </div>
          </div>
        )}
        
        {/* Event Type Badge */}
        {event.eventMode && (
          <Badge 
            className="absolute top-3 left-3"
            variant={event.eventMode === 'online' ? 'secondary' : event.eventMode === 'offline' ? 'default' : 'outline'}
          >
            {event.eventMode === 'online' ? '🌐 Online' : 
             event.eventMode === 'offline' ? '📍 Offline' : 
             '🔄 Hybrid'}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-sm text-center line-clamp-2 leading-tight">
          {event.eventName}
        </h3>
        
        <div className="flex flex-wrap gap-1 justify-center">
          {event.category && (
            <Badge variant="outline" className="text-xs">
              {event.category}
            </Badge>
          )}
          {event.department && (
            <Badge variant="secondary" className="text-xs">
              {event.department}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <div className="space-y-2 text-xs text-muted-foreground">
          {eventDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{eventDate}</span>
            </div>
          )}
          
          {event.eventTiming && event.eventTiming !== "TBA" && (
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{event.eventTiming}</span>
            </div>
          )}
          
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{event.venue}</span>
            </div>
          )}
          
          {spotsLeft !== null && spotsLeft >= 0 && (
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span>{spotsLeft} spots left</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/events/${event.uniqueName}`} className="w-full">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}