"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react"

export default function CyberSecureDigitalTwinsPage() {
  // Hardcoded event data for the static page
  const eventData = {
    title: "Cyber-Secure Digital Twins Workshop",
    date: "27th February 2026",
    time: "9:00 AM onwards",
    venue: "Thiagarajar College of Engineering",
    registerLink: "https://techutsavtce.tech",
    description: `🚀 TechUtsav Paradigm '26 is set to host an exciting and thought-provoking workshop on Cyber-Secure Digital Twins, a cutting-edge field that integrates cybersecurity, artificial intelligence, and digital twin technology to create secure, efficient, and sustainable digital replicas of real-world systems. This workshop will provide deep insights into how digital twins are transforming industries by enhancing predictive analytics, security frameworks, and operational resilience.`,
    speakers: [
      {
        name: "Dr. Gururaj H L",
        title: "ACM Eminent Speaker, Associate Professor",
        organization: "Manipal Institute of Technology, Bangalore",
        image: "/speakers/gururaj.jpg",
        bio: "With over 14 years of experience in teaching and research, Dr. Gururaj is a senior member of ACM & IEEE and a lifetime member of the Cryptology Society of India. His remarkable contributions to cybersecurity, blockchain technology, and machine learning applications have earned him prestigious awards, including the Young Scientist International Travel Grant and multiple Best Project Guide recognitions. Having published over 200 research papers, authored 23 books, and delivered 500+ technical talks globally, he is a recognized expert in AI, blockchain, cybersecurity, and IoT.",
      },
      {
        name: "Mr. Senthilkumar Murugesan",
        title: "Founder",
        organization: "JioVio Healthcare",
        image: "/speakers/senthilkumar.png",
        bio: "With an engineering background and a specialization in Startup Engineering from Stanford University, Senthilkumar has played a pivotal role in shaping technological innovations. A former leader at Samsung and Qualcomm, he holds over 10 patents and has successfully built startups like Geomeo and JioVio, showcasing his expertise in emerging tech and entrepreneurship.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] to-[#c7e7fc]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-r from-[#0B385F] to-[#3373B0]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="inline-block px-4 py-1 bg-white/20 text-white text-sm rounded-full mb-4">
            TechUtsav Paradigm '26
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{eventData.title}</h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{eventData.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#0B385F] mb-4">About the Event</h2>
          <p className="text-gray-700 mb-6">{eventData.description}</p>

          <div className="mt-8">
            <a
              href={eventData.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3373B0] to-[#0B385F] text-white rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Register Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Speakers Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B385F] mb-6">Meet Our Speakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventData.speakers.map((speaker, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={speaker.image || "/placeholder.svg?height=300&width=300"}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png"
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-6">
                  <h3 className="text-xl font-bold text-[#0B385F]">{speaker.name}</h3>
                  <p className="text-[#3373B0] font-medium">{speaker.title}</p>
                  <p className="text-gray-600 mb-4">{speaker.organization}</p>
                  <p className="text-gray-700 text-sm">{speaker.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mt-12">
          <h2 className="text-2xl font-bold text-[#0B385F] mb-4">What You'll Learn</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#3373B0] flex items-center justify-center text-white text-xs mr-3 mt-1">
                ✓
              </div>
              <p>How digital twins are transforming industries by enhancing predictive analytics</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#3373B0] flex items-center justify-center text-white text-xs mr-3 mt-1">
                ✓
              </div>
              <p>Security frameworks for digital twin implementations</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#3373B0] flex items-center justify-center text-white text-xs mr-3 mt-1">
                ✓
              </div>
              <p>Integration of cybersecurity, artificial intelligence, and digital twin technology</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#3373B0] flex items-center justify-center text-white text-xs mr-3 mt-1">
                ✓
              </div>
              <p>Building operational resilience through secure digital replicas</p>
            </li>
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 bg-white border border-[#3373B0] text-[#3373B0] rounded-lg font-medium transition-all hover:bg-[#3373B0] hover:text-white"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

