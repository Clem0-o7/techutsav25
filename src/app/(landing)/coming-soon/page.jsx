'use client'

import { Suspense, lazy } from 'react'
import { useAuth } from '@/lib/useAuth'
const Spline = lazy(() => import('@splinetool/react-spline'))

export default function ComingSoonPage() {
  const { authenticated } = useAuth()

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

      {/* Text overlay positioned on robot's torso */}

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-xl mx-4">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">
            TechUtsav
          </h1>

          <p className="mt-3 text-xl md:text-2xl font-medium tracking-widest
              text-red-500 drop-shadow-[0_0_12px_rgba(229,9,20,0.45)]">
            PARADIGM ’26
          </p>

          <p className="mt-4 text-sm md:text-base uppercase tracking-[0.3em]
              text-red-400/80">
            A New Paradigm Begins…
          </p>

          <p className="mt-6 text-xs md:text-sm tracking-wide text-red-300/70">
            Workshops · Paper Presentations · Ideathon · Tech/Non-Tech Events
          </p>



        </div>
      </div>

      {/* Instagram + Signup at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-auto text-center">

        <div className="flex items-center space-x-6 justify-center">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/techutsav_paradigm/"
            className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110 opacity-70 hover:opacity-100"
            target="_blank"
            rel="noopener noreferrer"
            title="TechUtsav Paradigm Instagram"
          >
            <svg
              className="w-6 h-6 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.163S15.403 5.838 12 5.838z" />
              <path d="M18.406 4.155a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z" />
            </svg>
          </a>

          {/* Signup/Profile Button */}
          {authenticated ? (
            <a
              href="/profile"
              className="
      inline-flex items-center justify-center
      px-7 py-2.5 rounded-full
      text-sm font-medium tracking-wide
      text-red-400
      border border-red-500/40
      bg-black/40 backdrop-blur-sm
      hover:bg-red-500/10
      hover:text-red-300
      hover:border-red-400
      transition-all duration-300
    "
            >
              Profile
            </a>
          ) : (
            <a
              href="/signup"
              className="
      inline-flex items-center justify-center
      px-7 py-2.5 rounded-full
      text-sm font-medium tracking-wide
      text-red-400
      border border-red-500/40
      bg-black/40 backdrop-blur-sm
      hover:bg-red-500/10
      hover:text-red-300
      hover:border-red-400
      transition-all duration-300
    "
            >
              Sign Up
            </a>
          )}




        </div>

        {/* Follow text */}
        <p className="mt-3 text-xs text-gray-400">
          Events opening soon <br /> Early registrations get priority access
        </p>
        <p className="text-xs text-gray-500 mt-3 drop-shadow-lg opacity-80">
          Follow for updates
        </p>
      </div>

      <div className="absolute inset-0 -z-10
                bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.15),transparent_60%)]" />


      {/* Optional: Add a subtle vignette effect */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
    </div>
  )
}
