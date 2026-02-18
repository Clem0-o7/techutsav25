import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: "Techutsav 'PARADIGM' '26 | Thiagarajar College of Engineering",
  description: "Experience the ultimate tech festival - Techutsav '26. Join us for workshops, competitions, and innovation. A Stranger Things inspired journey into the future of technology.",
  keywords: 'Techutsav, Engineering Festival, Workshops, Competitions, Innovation, Madurai',
  authors: [{ name: 'Techutsav Team' }],
  openGraph: {
    title: "Techutsav 'PARADIGM' '26",
    description: 'The ultimate tech festival experience',
    type: 'website',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Start%20Frame-FSsooGFhYUlQehnWGAcDC03hTBY444.jpeg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f0f0f',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
