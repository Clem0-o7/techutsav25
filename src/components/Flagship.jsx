"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const Flagship = ({ uniqueName, eventName, eventDescription, image, onError }) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight effect */}
      {isHovering && (
        <div
          className="absolute pointer-events-none bg-gradient-radial from-white/30 to-transparent opacity-70 w-[300px] h-[300px] rounded-full z-10 transition-all duration-300"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="w-full md:w-2/5 overflow-hidden">
          <div className="relative h-64 md:h-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={eventName}
              fill
              className="object-scale-down transition-transform duration-500 hover:scale-105"
              onError={onError}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-3/5 p-6 md:p-8">
          <div className="mb-2 inline-block px-3 py-1 bg-gradient-to-r from-[#3373B0] to-[#BED4E9] text-white text-sm rounded-full">
            Flagship Event
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B385F] mb-3">{eventName}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3373B0] to-[#BED4E9] rounded-full mb-4"></div>
          <p className="text-gray-700 mb-6 line-clamp-3 md:line-clamp-4">{eventDescription}</p>

          <Link
            href="/events/cyber-secure-digital-twins"
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#3373B0] to-[#0B385F] text-white rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            See More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Flagship

