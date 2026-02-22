"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Download, Lock, FileText, Phone, Mail, UserCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import MainLoader from "@/components/MainLoader"

export default function EventDetailsPage({ params }) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Unwrap params Promise for Next.js 16
  const unwrappedParams = use(params)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log('Fetching event with uniqueName:', unwrappedParams.uniqueName)
        const response = await fetch(`/api/event/single?id=${unwrappedParams.uniqueName}`)
        
        console.log('API Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.text()
          console.log('API Error response:', errorData)
          throw new Error(`Event not found: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('Event data received:', data)
        setEvent(data.event)
      } catch (error) {
        console.error('Error fetching event:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (unwrappedParams.uniqueName) {
      fetchEvent()
    }
  }, [unwrappedParams.uniqueName])

  // Get user's verified passes (simplified like ProfileQRCode)
  const getVerifiedPass1 = () => {
    if (!user?.passes) {
      console.log('[DEBUG] No user or no passes found:', user)
      return null
    }
    console.log('[DEBUG] User passes:', user.passes)
    const verifiedPass1 = user.passes.find(p => p.passType === 1 && p.status === 'verified')
    console.log('[DEBUG] Verified Pass 1:', verifiedPass1)
    return verifiedPass1
  }

  // Check if user has access (simplified - only Pass 1 needed for all events)
  const hasRulebookAccess = () => {
    const verifiedPass1 = getVerifiedPass1()
    const hasAccess = !!verifiedPass1
    console.log('[DEBUG] Rulebook access:', hasAccess)
    return hasAccess
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

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

  const handleRulebookAccess = () => {
    if (!hasRulebookAccess()) return
    if (!event?.rulebook) return
    window.open(event.rulebook, '_blank', 'noopener,noreferrer')
  }

  if (loading || authLoading) {
    return <MainLoader />
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "The event you're looking for doesn't exist."}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Event: "{unwrappedParams.uniqueName}" | Check browser console for details
          </p>
          <Link href="/events">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }


  const formattedDate = formatDate(event.eventDate)
  const hasAccess = hasRulebookAccess()
  const verifiedPass1 = getVerifiedPass1()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/events">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Poster - Now Primary */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  {event.poster ? (
                    <Image
                      src={event.poster}
                      alt={event.eventName}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <div className="text-center">
                        <Calendar className="h-16 w-16 mx-auto mb-4 opacity-40" />
                        <span className="text-lg">Event Poster</span>
                        <p className="text-sm mt-2 px-4">
                          Poster will be available soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className={getModeColor(event.eventMode)}>
                  {getModeIcon(event.eventMode)} {event.eventMode}
                </Badge>
                {event.category && (
                  <Badge variant="outline">{event.category}</Badge>
                )}
                {event.department && (
                  <Badge variant="secondary">{event.department}</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{event.eventName}</h1>
              
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                )}
                {event.eventTiming && event.eventTiming !== "TBA" && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.eventTiming}</span>
                  </div>
                )}
                {event.venue && event.venue !== "TBA" && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                )}
                {event.maxTeamSize && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Max team size: {event.maxTeamSize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.eventAbstract && (
                  <div>
                    <h4 className="font-medium mb-2">Overview</h4>
                    <p className="text-muted-foreground">{event.eventAbstract}</p>
                  </div>
                )}
                
                {event.eventDesp && event.eventDesp !== event.eventAbstract && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{event.eventDesp}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Cards */}
            {(event.incharge || (event.coordinators && event.coordinators.length > 0)) && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Event Manager / Incharge */}
                  {event.incharge && (
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
                      <div className="mt-0.5 flex-shrink-0">
                        <UserCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Event Manager</p>
                        <p className="font-medium truncate">{event.incharge}</p>
                        {event.inchargeNumber && (
                          <a
                            href={`tel:${event.inchargeNumber}`}
                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-1"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {event.inchargeNumber}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Coordinators */}
                  {event.coordinators && event.coordinators.map((coord, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
                      <div className="mt-0.5 flex-shrink-0">
                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                          {coord.role || "Coordinator"}
                        </p>
                        <p className="font-medium truncate">{coord.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          {coord.phone && (
                            <a
                              href={`tel:${coord.phone}`}
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              {coord.phone}
                            </a>
                          )}
                          {coord.email && (
                            <a
                              href={`mailto:${coord.email}`}
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              {coord.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Event Resources - Following ProfileQRCode pattern */}
            <Card>
              <CardHeader>
                <CardTitle>Event Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {hasAccess ? (
                  <div className="space-y-4">
                    {/* Pass Verified State */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-600 text-lg">✓</span>
                        <div>
                          <h4 className="font-medium text-green-800 dark:text-green-400">Rulebook Access Granted</h4>
                          <p className="text-sm text-green-600 dark:text-green-300">
                            Verified with Pass 1 on {verifiedPass1 ? new Date(verifiedPass1.verifiedDate || verifiedPass1.submittedDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric'
                            }) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleRulebookAccess}
                        variant="default"
                        size="sm"
                        className="w-full"
                        disabled={!event.rulebook}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {event.rulebook ? "Download Rulebook" : "Rulebook Not Available Yet"}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      💡 Make sure to read the rulebook carefully before participating in the event.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* No Access State - Following ProfileQRCode pattern */}
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground">Rulebook Access Required</h4>
                        <p className="text-sm text-muted-foreground">
                          Purchase and verify <strong>Pass 1 (Offline Workshop + All Events)</strong> to access the event rulebook
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        disabled
                        className="w-full"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Get Pass 1 to Access Rulebook
                      </Button>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">🎫 Pass 1 Benefits:</h5>
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Access to all event rulebooks</li>
                        <li>• Entry to all 15+ events</li>
                        <li>• Offline workshop participation</li>
                        <li>• Priority registration benefits</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}