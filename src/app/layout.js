import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from "next/font/google"
import { Providers } from "./providers/theme-provider"

export const metadata = {
  title: "TechUtsav – National Level Tech Symposium",
  description:
    "TechUtsav 2026 – National Level Tech Symposium hosted by CSE, IT, CSBS, AMCS, MCA",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})


export default function RootLayout({ children }) {
  return (
    <html lang="en"  className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}