"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, GamepadIcon, Trophy, Zap } from "lucide-react";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("technical");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const technicalEvents = [
    {
      id: 1,
      name: "Code Red: Escape The Mind",
      description: "Navigate through complex coding puzzles and escape the mind traps using your programming prowess.",
      icon: Code,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 2,
      name: "Core Logic Arena",
      description: "Battle it out with algorithms and data structures in this competitive programming showdown.",
      icon: Trophy,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 3,
      name: "Think Like Eleven",
      description: "Harness your mental powers to solve complex computational problems and logical challenges.",
      icon: Zap,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 4,
      name: "Model Matters",
      description: "Build and showcase innovative technical models demonstrating cutting-edge technology solutions.",
      icon: GamepadIcon,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 5,
      name: "Mindflayer.io",
      description: "Real-time multiplayer coding competition where speed and accuracy determine the victor.",
      icon: Code,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 6,
      name: "Hawkins Hack",
      description: "Intense 24-hour hackathon challenge to develop groundbreaking solutions to real-world problems.",
      icon: Trophy,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 7,
      name: "Upside Down Markets",
      description: "Analyze and predict market trends using data science and machine learning techniques.",
      icon: Zap,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 8,
      name: "Stranger Thinks",
      description: "Tech quiz with unexpected twists covering programming, cybersecurity, and emerging technologies.",
      icon: GamepadIcon,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 9,
      name: "Fix & Play (Debugging)",
      description: "Race against time to debug complex code and get applications running flawlessly.",
      icon: Code,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 10,
      name: "Battle of Brains (Tech Puzzle)",
      description: "Solve intricate technical puzzles that challenge your problem-solving and analytical skills.",
      icon: Trophy,
      color: "from-accent/20 to-primary/10"
    }
  ];

  const nonTechnicalEvents = [
    {
      id: 1,
      name: "VirtuAct",
      description: "Showcase your acting talents in this virtual performance competition with digital flair.",
      icon: GamepadIcon,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 2,
      name: "Hawkin's Lab",
      description: "Conduct fascinating science experiments and demonstrations that blur reality and imagination.",
      icon: Zap,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 3,
      name: "Survive the Deck",
      description: "Strategic card-based game where wit and tactics determine who survives till the end.",
      icon: Trophy,
      color: "from-primary/20 to-accent/10"
    },
    {
      id: 4,
      name: "Dungeons and Dragons",
      description: "Embark on an epic role-playing adventure filled with mystery, magic, and strategic battles.",
      icon: GamepadIcon,
      color: "from-accent/20 to-primary/10"
    },
    {
      id: 5,
      name: "Fun Flicks",
      description: "Test your movie knowledge with trivia, screenings, and cinematic challenges for film enthusiasts.",
      icon: Code,
      color: "from-primary/20 to-accent/10"
    }
  ];

  const currentEvents = activeCategory === "technical" ? technicalEvents : nonTechnicalEvents;
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
            onClick={() => handleCategoryChange("technical")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === "technical"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card border border-border text-foreground hover:border-primary/40"
            }`}
          >
            Technical Events
          </button>
          <button
            onClick={() => handleCategoryChange("non-technical")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === "non-technical"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card border border-border text-foreground hover:border-primary/40"
            }`}
          >
            Non-Technical Events
          </button>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          key={activeCategory + currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {displayedEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-bold mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary group-hover:from-primary group-hover:to-foreground transition-all">
                    {event.name}
                  </span>
                </h3>
                
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 min-h-[4rem]">
                  {event.description}
                </p>
                
                <button className="w-full px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary rounded-lg font-medium transition-all duration-300 text-sm group-hover:scale-105">
                  Details Coming Soon
                </button>
              </motion.div>
            );
          })}
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
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">15+</div>
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
