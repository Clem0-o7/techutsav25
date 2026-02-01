"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Flagship from "@/components/Flagship";
import SpotlightCard from "@/components/SpotLightCard";
import { motion } from "framer-motion";

const Events = () => {
  const router = useRouter();
  const [flagShipEvents, setFlagShipEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const departments = ["CSE", "IT", "CSBS", "DS"];

  useEffect(() => {
    const fetchFlagshipEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/event/flagship");
        const data = await res.json();
        setFlagShipEvents(data);
      } catch (err) {
        console.error("Error fetching flagship events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlagshipEvents();
  }, []);

  const handleDepartmentClick = (dept) => {
    router.push(`/events/${dept}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] to-[#c7e7fc] px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(to right, #1C2127, #0B385F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EVENTS
        </h1>
        <div
          className="h-1.5 w-40 mx-auto mt-4 rounded-full"
          style={{ background: "linear-gradient(to right, #3373B0, #BED4E9)" }}
        ></div>
      </motion.div>

      {/* Flagship Events */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto mb-16"
      >
        {loading ? (
          <div className="w-full flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-lg bg-gray-300 h-80 w-full max-w-2xl"></div>
              <div className="rounded h-10 bg-gray-300 mt-4 w-3/4"></div>
              <div className="rounded h-6 bg-gray-300 mt-3 w-1/2"></div>
            </div>
          </div>
        ) : flagShipEvents.length === 0 ? (
          <p className="text-gray-600 py-10 text-center">
            No flagship events available at the moment.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {flagShipEvents.map((event, index) => {
              const baseUrl =
                "https://clement2004.blob.core.windows.net/techutsav25";
              const jpgUrl = `${baseUrl}/${event.uniqueName}.jpg`;
              const pngUrl = `${baseUrl}/${event.uniqueName}.png`;

              // Start with JPG; if it fails, switch to PNG, else fallback to placeholder.
              const handleImageError = (e) => {
                if (e.currentTarget.src === jpgUrl) {
                  e.currentTarget.src = pngUrl;
                } else {
                  e.currentTarget.src = "/images/placeholder.png";
                }
              };

              return (
                <motion.div
                  key={event.uniqueName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto"
                >
                  <Flagship
                    uniqueName={event.uniqueName}
                    eventName={event.eventName}
                    eventDescription={event.eventAbstract}
                    image={jpgUrl}
                    onError={handleImageError}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Department Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto py-16 px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {departments.map((dept) => (
            <motion.div
              key={dept}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <SpotlightCard
                name={dept}
                onClick={() => handleDepartmentClick(dept)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
