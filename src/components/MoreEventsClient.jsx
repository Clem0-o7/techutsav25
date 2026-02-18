"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navbar } from './Navbar/Navbar';
import Footer from './Footer';
import MainLoader from '../components/MainLoader';
import Typography from '@mui/material/Typography';
import '@/styles/globals.css';

const MoreEventsClient = ({ events, department }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollUp = useRef(null);

  useEffect(() => {
    scrollUp.current?.scrollIntoView({ behavior: 'smooth' });
    setLoading(false);
  }, []);

  if (!events || events.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        No events found for {department}
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const baseUrl = "https://clement2004.blob.core.windows.net/techutsav25";
  const jpgUrl = `${baseUrl}/${currentEvent.uniqueName}.jpg`;
  const pngUrl = `${baseUrl}/${currentEvent.uniqueName}.png`;

  const [imageUrl, setImageUrl] = useState(jpgUrl);
  const handleImageError = (e) => {
    if (e.currentTarget.src === jpgUrl) {
      setImageUrl(pngUrl);
    } else {
      setImageUrl("/images/placeholder.png");
    }
  };

  const handleThumbError = (e, event) => {
    const eventJpgUrl = `${baseUrl}/${event.uniqueName}.jpg`;
    const eventPngUrl = `${baseUrl}/${event.uniqueName}.png`;
    if (e.currentTarget.src === eventJpgUrl) {
      e.currentTarget.src = eventPngUrl;
    } else {
      e.currentTarget.src = "/images/placeholder.png";
    }
  };

  const handleRegisterClick = async () => {
    try {
      const response = await fetch("/api/auth/me", { credentials: "include" });
  
      if (response.ok) {

        router.push("/profile");
      } else {

        router.push("/signup");
      }
    } catch (error) {
 
      router.push("/signup");
    }
  };
  

  return (
    <div>
      {loading ? (
        <MainLoader />
      ) : (
        <div className="w-full min-h-screen bg-background text-foreground">
          <Navbar />

          <div className="text-center py-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                TechUtsav Paradigm '26 Events
              </span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full p-6 gap-6">
            <motion.img
              key={currentEvent._id}
              src={imageUrl}
              alt={currentEvent.uniqueName}
              className="lg:w-1/1 h-96 object-scale-down rounded-xl shadow-lg"
              initial={{ opacity: 0.5, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onError={handleImageError}
            />

            <motion.div
              className="w-full p-6 rounded-xl shadow-lg bg-card/50 backdrop-blur-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                  {currentEvent.eventName}
                </span>
              </h2>
              <p className="text-lg mt-2 text-foreground/80">
                {currentEvent.eventAbstract}
              </p>
              {/*<p className="mt-2">
                <strong>📍 Venue:</strong> {currentEvent.venue}
              </p>*/}
              <p className="text-foreground/70 mt-2">
                <strong>🕒 Time:</strong> {currentEvent.eventTiming}
              </p>

              <button
                className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/30"
                onClick={() => setModalOpen(true)}
              >
                More Details
              </button>
            </motion.div>
          </div>

          <div className="flex overflow-x-auto p-4 gap-4 justify-center">
            {events.map((event, index) => (
              <motion.img
                key={event._id}
                src={`${baseUrl}/${event.uniqueName}.jpg`}
                alt={event.uniqueName}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-4 border-primary scale-110 shadow-lg shadow-primary/30'
                    : 'border-2 border-border hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setCurrentIndex(index);
                  setImageUrl(`${baseUrl}/${event.uniqueName}.jpg`);
                }}
                onError={(e) => handleThumbError(e, event)}
              />
            ))}
          </div>

          <AnimatePresence>
            {modalOpen && (
              <motion.div
                className="fixed inset-0 mt-3 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-card/95 backdrop-blur-md text-foreground p-8 rounded-xl max-w-xl w-full shadow-2xl relative border border-border"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                >
                  <h2 className="text-3xl font-bold text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                      {currentEvent.eventName}
                    </span>
                  </h2>
                  <div className="overflow-y-auto max-h-[60vh] mt-3">
                    <Typography
                      marginTop={'24px'}
                      fontSize={'18px'}
                      className="whitespace-pre-wrap text-foreground/80"
                    >
                      {currentEvent.eventDesp}
                    </Typography>
                    <p className="mt-3 text-foreground/70">
                      <strong>📚 Contact :</strong> {currentEvent.incharge}
                    </p>
                    <p className="text-foreground/70">
                      <strong>Mobile Number:</strong> {currentEvent.inchargeNumber}
                    </p>
                  </div>

                  <div className="flex justify-between mt-5 gap-4">
                    <button
                      className="px-5 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/30"
                      onClick={handleRegisterClick}
                    >
                      Register Now
                    </button>
                    <button
                      className="px-4 py-2 bg-destructive hover:bg-destructive/90 rounded-lg text-white transition-all duration-300"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default MoreEventsClient;
