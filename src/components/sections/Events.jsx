"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("tech");
  const [currentPage, setCurrentPage] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events?sortBy=priority');
        const data = await response.json();
        
        if (data.success) {
          setAllEvents(data.events);
        } else {
          setError('Failed to load events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by category
  const currentEvents = allEvents.filter(event => {
    if (activeCategory === "tech") {
      return event.category === "tech" || event.category === "technical";
    } else {
      return event.category === "non-tech" || event.category === "cultural" || event.category === "non-technical";
    }
  });

  const totalPages = Math.ceil(currentEvents.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayedEvents = currentEvents.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  // Loading state
  if (loading) {
    return (
      <section id="events" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="events" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-destructive">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              EVENTS
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="text-foreground/70 mt-6 text-sm sm:text-base max-w-2xl mx-auto">
            Join us for exciting competitions and challenges themed around the digital mysteries
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => handleCategoryChange("tech")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === "tech"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card border border-border text-foreground hover:border-primary/40"
            }`}
          >
            Technical Events
          </button>
          <button
            onClick={() => handleCategoryChange("non-tech")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === "non-tech"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card border border-border text-foreground hover:border-primary/40"
            }`}
          >
            Non-Technical Events
          </button>
        </motion.div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <Link href="/events">
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
              <ExternalLink className="w-5 h-5 inline mr-2" />
              View All Events
            </button>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          key={activeCategory + currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {displayedEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-foreground/60 text-lg">
                No {activeCategory === "tech" ? "technical" : "non-technical"} events available at the moment.
              </div>
              <p className="text-foreground/40 text-sm mt-2">
                Check back soon for exciting events!
              </p>
            </div>
          ) : (
            displayedEvents.map((event, index) => {
              return (
                <Link key={event._id} href={`/events/${event.uniqueName}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
                  >                
                    <h3 className="text-lg font-bold mb-3">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary group-hover:from-primary group-hover:to-foreground transition-all">
                        {event.eventName}
                      </span>
                    </h3>
                    
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 min-h-[4rem]">
                      {event.eventAbstract || event.eventDesp || "Event details coming soon"}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-muted-foreground">
                        {event.department}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {event.eventMode}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <span className="inline-block w-full px-4 py-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 rounded-lg font-medium transition-all duration-300 text-sm text-center">
                        View Event Details
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          )}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-3 rounded-lg transition-all duration-300 ${
                currentPage === 0
                  ? "bg-card/50 border border-border text-muted-foreground cursor-not-allowed"
                  : "bg-card border border-primary/30 text-primary hover:bg-primary hover:text-white hover:scale-110"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === index
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                      : "bg-card border border-border text-foreground hover:border-primary/40 hover:scale-105"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-3 rounded-lg transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? "bg-card/50 border border-border text-muted-foreground cursor-not-allowed"
                  : "bg-card border border-primary/30 text-primary hover:bg-primary hover:text-white hover:scale-110"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Event Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Event Highlights
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{allEvents.length}+</div>
              <div className="text-foreground/70 text-sm">Total Events</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">₹35K</div>
              <div className="text-foreground/70 text-sm">Prize Pool</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-foreground/70 text-sm">Participants </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
