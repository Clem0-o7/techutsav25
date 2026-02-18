"use client";

import { motion } from "framer-motion";
import { FileText, Lightbulb, Users, Clock, Trophy, Star } from "lucide-react";

const OnlineEvents = () => {
  const onlineEvents = [
    {
      id: 1,
      name: "Paper Presentation",
      subtitle: "Share Your Research",
      description: "Present your innovative research papers and technical findings to a panel of expert judges. Showcase your academic excellence and contribute to the knowledge pool with cutting-edge ideas and solutions.",
      icon: FileText,
      highlights: [
        "Multiple Technical Domains",
        "Expert Panel Judging",
        "ISBN Published Proceedings",
        "Best Paper Awards"
      ],
      duration: "20 mins presentation + 10 mins Q&A",
      platform: "Online ",
      prizes: "₹35,000 Prize Pool",
      color: "from-primary/20 to-accent/10",
      featured: true
    },
    {
      id: 2,
      name: "Ideathon",
      subtitle: "Innovate. Pitch. Win.",
      description: "Transform your groundbreaking ideas into reality! Pitch your innovative solutions to real-world problems and compete with creative minds from across the nation. Best ideas win mentorship and funding opportunities.",
      icon: Lightbulb,
      highlights: [
        "Problem-Solution Innovation",
        "Investor Pitch Format",
        "Mentorship Opportunities",
        "Startup Guidance"
      ],
      duration: "15 mins pitch + 10 mins Q&A",
      platform: "Online",
      prizes: "₹35,000 Prize Pool",
      color: "from-accent/20 to-primary/10",
      featured: true
    }
  ];

  return (
    <section id="online-events" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
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
              ONLINE EVENTS
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="text-foreground/70 mt-6 text-sm sm:text-base max-w-2xl mx-auto">
            Participate from anywhere! Showcase your research and innovative ideas in our flagship online competitions
          </p>
        </motion.div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {onlineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Featured Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/30 flex items-center gap-1 animate-pulse-subtle">
                    <Star className="w-4 h-4 fill-current" />
                    FEATURED
                  </div>
                </div>

                {/* Card */}
                <div className="h-full bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
                  {/* Header Section */}
                  <div className={`bg-gradient-to-br ${event.color} p-8 border-b border-border`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                        {event.name}
                      </span>
                    </h2>
                    <p className="text-primary text-lg font-semibold mb-4">
                      {event.subtitle}
                    </p>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Highlights */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Event Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {event.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-foreground/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground/70">{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground/70">{event.platform}</span>
                      </div>
                    </div>

                    {/* Prize Section */}
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">Total Prizes:</span>
                        <span className="text-lg font-bold text-primary">{event.prizes}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button onClick={() => window.location.href = '/login'} className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        Register Now
                      </button>
                      
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Participate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Why Participate in Online Events?
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Pan-India</div>
              <div className="text-foreground/70 text-sm">Participate from Anywhere</div>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">₹35K+</div>
              <div className="text-foreground/70 text-sm">Total Prize Money</div>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Certificates</div>
              <div className="text-foreground/70 text-sm">For All Participants</div>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Mentorship</div>
              <div className="text-foreground/70 text-sm">Expert Guidance</div>
            </div>
          </div>
        </motion.div>

        {/* Registration Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground/60 text-sm">
            <span className="text-primary font-semibold">Note:</span> Online events are included in PASS 3 and PASS 4. 
            Register early to secure your spot!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineEvents;
