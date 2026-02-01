'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] relative overflow-hidden">
      {/* Spotlight effect */}
      <div className="absolute -top-40 left-0 md:left-60 md:-top-20 w-[40rem] h-[40rem] opacity-50 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Full screen 3D Scene as background with interactivity */}
      <div className="absolute inset-0 z-0">
        <Suspense 
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>

      {/* Text overlay positioned higher on robot's chest area */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-16 md:pt-8 pointer-events-none">
        <div className="text-center max-w-lg mx-4">
          {/* Main title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2 drop-shadow-2xl">
            TechUtsav
          </h1>
          
          {/* Event name */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 drop-shadow-xl">
            Panaroma 2026
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-cyan-300 font-semibold mb-3 drop-shadow-xl">
            National Level Tech Symposium
          </p>
          
          {/* Department info */}
          <p className="text-xs sm:text-sm text-purple-300 mb-4 drop-shadow-lg">
            Hosted by CSE • IT • CSBS • AMCS • MCA
          </p>
          
          {/* Coming soon */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 drop-shadow-xl">
            Coming Soon
          </div>
          
          {/* Teasers */}
          <div className="space-y-2 mb-6">
            <p className="text-sm sm:text-base text-emerald-300 drop-shadow-lg">
              🏆 Epic Hackathon Challenge
            </p>
            <p className="text-sm sm:text-base text-orange-300 drop-shadow-lg">
              🚀 Cutting-Edge Tech Workshops
            </p>
            <p className="text-sm sm:text-base text-pink-300 drop-shadow-lg">
              💡 Innovation Competitions
            </p>
          </div>
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8 drop-shadow-lg max-w-md mx-auto">
            Get ready for the most innovative tech festival of the year. 
            Immersive experiences, cutting-edge technology, and unforgettable moments await.
          </p>
          
          {/* Status indicator */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-xs text-neutral-400 mb-3 drop-shadow-lg">Stay tuned for updates</div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse drop-shadow-lg"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150 drop-shadow-lg"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300 drop-shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram links at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-auto">
        <div className="flex space-x-6">
          {/* Main TechUtsav Instagram */}
          <a 
            href="#" 
            className="text-pink-400 hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          
          {/* Department Instagrams */}
          <a 
            href="#" 
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            title="CSE Department"
          >
            <svg className="w-6 h-6 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          
          <a 
            href="#" 
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            title="IT Department"
          >
            <svg className="w-6 h-6 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
        
        {/* Follow text */}
        <p className="text-center text-xs text-neutral-400 mt-3 drop-shadow-lg">
          Follow for updates
        </p>
      </div>

      {/* Optional: Add a subtle vignette effect */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
    </div>
  )
}