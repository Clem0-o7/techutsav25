"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Link as ScrollLink, Events, scrollSpy, scroller } from "react-scroll"

const Navbar = ({ authenticated }) => {
  const [isLoginHovered, setIsLoginHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const router = useRouter()
  const pathname = usePathname()
  const [isHomePage, setIsHomePage] = useState(false)

  // Dark theme colors
  const theme = {
    eerieBlack: "#1C2127",
    berkeleyBlue: "#0B385F",
    uclaBlue: "#3373B0",
    columbiaBlue: "#BED4E9",
    aliceBlue: "#E7F1FB",
  }

  const Links = [
    { name: "Home", link: "home" },
    { name: "About", link: "about" },
    { name: "Events", link: "events" },
    { name: "Memories", link: "past-year-highlights" }, 
    { name: "FAQs", link: "faq" },
    { name: "Guidelines", link: "/guidelines" }, 
    { name: "Contact", link: "contact" },
  ]

  // Check if we're on the home page
  useEffect(() => {
    setIsHomePage(pathname === "/" || pathname === "/#home")
  }, [pathname])

  // Set up scrollSpy
  useEffect(() => {
    if (isHomePage) {
      Events.scrollEvent.register("begin", () => {})
      Events.scrollEvent.register("end", () => {})
      scrollSpy.update()

      return () => {
        Events.scrollEvent.remove("begin")
        Events.scrollEvent.remove("end")
      }
    }
  }, [isHomePage])

  // Handle navigation from non-home pages
  const handleNavigation = (linkId) => {
    if (linkId.startsWith("/")) {
      // Direct link to a page
      router.push(linkId)
    } else if (!isHomePage) {
      // Navigate to home page with hash
      router.push(`/#${linkId}`)
    } else {
      // Use react-scroll to scroll to the section
      scroller.scrollTo(linkId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70, // Adjust for navbar height
      })
    }

    // Close mobile menu if open
    if (open) setOpen(false)

    // Update active link
    setActiveLink(linkId)
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
      })
      if (res.ok) {
        router.refresh()
      } else {
        console.error("Logout failed")
      }
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const handleProfile = async () => {
    try {
      const res = await fetch("/api/profile/getProfile", {
        method: "GET",
      })
      if (res.ok) {
        router.push("/profile")
      } else {
        router.push("/login")
      }
    } catch (err) {
      router.push("/login")
    }
  }

  return (
    <div className="w-full top-0 left-0 sticky z-40">
      <div
        className="lg:flex items-center justify-between py-3 lg:px-10 px-9 shadow-md"
        style={{
          backgroundColor: theme.eerieBlack,
          borderBottom: `1px solid ${theme.uclaBlue}`,
        }}
      >
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]">
          {isHomePage ? (
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={800}
              offset={-70}
              onClick={() => {
                setActiveLink("home")
                if (open) setOpen(false)
              }}
              className="transition-transform hover:scale-105 cursor-pointer"
            >
              <Image src="/logo.png" alt="TCE" width={50} height={50} className="max-h-12" />
            </ScrollLink>
          ) : (
            <Link href="/#home" onClick={() => setActiveLink("home")} className="transition-transform hover:scale-105">
              <Image src="/logo.png" alt="TCE" width={50} height={50} className="max-h-12" />
            </Link>
          )}
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer lg:hidden flex items-center h-[5vh]"
          style={{ color: theme.aliceBlue }}
        >
          {open ? (
            <button className="transition-all duration-300 hover:text-uclaBlue" style={{ color: theme.columbiaBlue }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button className="transition-all duration-300 hover:text-uclaBlue" style={{ color: theme.columbiaBlue }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          )}
        </div>

        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-9 absolute lg:static md:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
          style={{ backgroundColor: theme.eerieBlack }}
        >
          {Links.map((link) => (
            <li key={link.name} className="lg:ml-8 text-xl lg:my-0 my-7 cursor-pointer">
              {isHomePage && !link.link.startsWith("/") ? (
                <ScrollLink
                  to={link.link}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  activeClass="active"
                  onSetActive={() => setActiveLink(link.link)}
                  onClick={() => {
                    setActiveLink(link.link)
                    if (open) setOpen(false)
                  }}
                  className="font-semibold text-base tracking-wider px-4 py-2 rounded-md transition-all duration-300 relative cursor-pointer"
                  style={{
                    color: activeLink === link.link ? theme.uclaBlue : theme.columbiaBlue,
                    borderBottom: activeLink === link.link ? `2px solid ${theme.uclaBlue}` : "none",
                  }}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <a
                  href={link.link.startsWith("/") ? link.link : `/#${link.link}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation(link.link)
                  }}
                  className="font-semibold text-base tracking-wider px-4 py-2 rounded-md transition-all duration-300 relative"
                  style={{
                    color: activeLink === link.link ? theme.uclaBlue : theme.columbiaBlue,
                    borderBottom: activeLink === link.link ? `2px solid ${theme.uclaBlue}` : "none",
                  }}
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
          <li className="cursor-pointer ml-0 lg:ml-8 lg:mt-0 mt-7">
            {authenticated ? (
              <button
                onClick={handleLogout}
                className="px-7 py-2 rounded-md transition-all duration-300 font-medium"
                style={{
                  backgroundColor: isLoginHovered ? theme.uclaBlue : "transparent",
                  color: isLoginHovered ? theme.aliceBlue : theme.uclaBlue,
                  border: `2px solid ${theme.uclaBlue}`,
                }}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleProfile}
                className="px-7 py-2 rounded-md transition-all duration-300 font-medium"
                style={{
                  backgroundColor: isLoginHovered ? theme.uclaBlue : "transparent",
                  color: isLoginHovered ? theme.aliceBlue : theme.uclaBlue,
                  border: `2px solid ${theme.uclaBlue}`,
                }}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
              >
                Profile
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

