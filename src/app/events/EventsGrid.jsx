'use client'

import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



const EventsGrid = ({ events = [] }) => {
  const [viewMode, setViewMode] = useState('grid') // grid or list

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find events
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {events.map((event) => (
          <EventCard 
            key={event._id} 
            event={event} 
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}

const EventCard = ({ event, viewMode }) => {
  const {
    eventName,
    eventAbstract,
    eventDesp,
    category,
    department,
    eventMode,
    eventDate,
    eventTiming,
    venue,
    maxTeamSize,
    registeredParticipants = [],
    uniqueName,
    poster
  } = event

  const spotsRemaining = maxTeamSize ? maxTeamSize - registeredParticipants.length : null

  const getModeColor = (mode) => {
    switch (mode) {
      case 'online': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'offline': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'hybrid': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'online': return '🌐'
      case 'offline': return '📍'
      case 'hybrid': return '🔄'
      default: return '📅'
    }
  }

  if (viewMode === 'list') {
    return (
      <Card className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <CardTitle className="text-xl mb-2">{eventName}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className={getModeColor(eventMode)}>
                  {getModeIcon(eventMode)} {eventMode}
                </Badge>
                <Badge variant="outline">{category}</Badge>
                <Badge variant="outline">{department}</Badge>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {eventAbstract || eventDesp || "Event details coming soon"}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {eventDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(eventDate).toLocaleDateString()}</span>
              </div>
            )}
            {eventTiming && eventTiming !== "TBA" && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{eventTiming}</span>
              </div>
            )}
            {venue && venue !== "TBA" && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{venue}</span>
              </div>
            )}
            {maxTeamSize && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Max team: {maxTeamSize}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 md:w-48 border-t md:border-t-0 md:border-l flex flex-col justify-center">
          <Link href={`/events/${uniqueName}`} className="w-full">
            <Button variant="default" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  // Grid view (default)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className={getModeColor(eventMode)}>
              {getModeIcon(eventMode)} {eventMode}
            </Badge>
            <Badge variant="outline">{category}</Badge>
          </div>
          <CardTitle className="text-lg leading-tight">{eventName}</CardTitle>
          <Badge variant="outline" className="w-fit">{department}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {eventAbstract || eventDesp || "Event details coming soon"}
        </p>
        
        <div className="space-y-2 text-sm">
          {eventDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(eventDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}</span>
            </div>
          )}
          {eventTiming && eventTiming !== "TBA" && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{eventTiming}</span>
            </div>
          )}
          {venue && venue !== "TBA" && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{venue}</span>
            </div>
          )}
          {maxTeamSize && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Max team size: {maxTeamSize}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <Link href={`/events/${uniqueName}`} className="w-full">
          <Button variant="default" size="sm" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EventsGrid