"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";

// Dynamically import Particles to prevent SSR issues
const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });

const theme = createTheme({
  palette: {
    primary: {
      main: "#06b6d4",
    },
  },
});

export default function MainLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black font-poppins relative overflow-hidden">
      
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Particles
          particleCount={80}
          particleSpread={8}
          speed={0.05}
          particleColors={["#06b6d4", "#0d9488", "#ffffff"]}
          moveParticlesOnHover={false}
          particleHoverFactor={1}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={true}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <h1 className="text-xl sm:text-2xl text-white text-center font-light tracking-wider opacity-80">
          Initializing
        </h1>
        <div className="flex gap-3 items-center w-72 sm:w-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 2, 
                  borderRadius: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#06b6d4",
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
                  },
                }}
              />
            </Box>
          </ThemeProvider>
          <div className="flex items-center">
            <p className="text-gray-500 text-xs">/</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>

        <h1
          className="text-3xl sm:text-5xl text-white text-center font-bold tracking-tighter"
          style={{
            textShadow: "0 0 20px rgba(6, 182, 212, 0.2)",
          }}
        >
          TechUtsav '26
        </h1>
      </div>
    </div>
  );
}
