"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBack, Download, QrCode2, School, EventNote, Restaurant, Badge, Payment, HowToReg } from '@mui/icons-material';

export default function Guidelines() {
  // Using the same theme as in the navbar
  const theme = {
    eerieBlack: "#1C2127",
    berkeleyBlue: "#0B385F",
    uclaBlue: "#3373B0",
    columbiaBlue: "#BED4E9",
    aliceBlue: "#E7F1FB",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.eerieBlack }}>
      {/* Header with gradient background */}
      <div 
        className="w-full py-8 text-center"
        style={{ 
          background: `linear-gradient(135deg, ${theme.berkeleyBlue}, ${theme.uclaBlue})`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-wide"
          style={{ color: theme.aliceBlue }}
        >
          Guidelines
        </h1>
        <p 
          className="mt-3 text-lg md:text-xl"
          style={{ color: theme.columbiaBlue }}
        >
          Important information for all participants
        </p>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-6 transition-all duration-300 hover:opacity-80 group"
          style={{ color: theme.columbiaBlue }}
        >
          <ArrowBack 
            className="group-hover:translate-x-[-4px] transition-transform" 
            style={{ fontSize: 20 }} 
          />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div 
          className="rounded-lg p-6 md:p-8 shadow-lg max-w-4xl mx-auto"
          style={{ 
            backgroundColor: theme.eerieBlack, 
            border: `1px solid ${theme.uclaBlue}`,
            boxShadow: `0 8px 32px rgba(11, 56, 95, 0.15)`
          }}
        >
          {/* Registration Guidelines Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <HowToReg style={{ color: theme.uclaBlue, fontSize: 28 }} />
              <h2 
                className="text-2xl md:text-3xl font-bold pb-2"
                style={{ color: theme.uclaBlue, borderBottom: `2px solid ${theme.uclaBlue}` }}
              >
                Registration Guidelines
              </h2>
            </div>

            <ul className="space-y-4">
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  1
                </span>
                <span className="text-base md:text-lg">All participants are requested to register individually.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  2
                </span>
                <span className="text-base md:text-lg">Registration fee per participant (Workshop and all Events) is <strong>Rs. 500/- (Rs. Five Hundred Only)</strong></span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  3
                </span>
                <span className="text-base md:text-lg">Participants must confirm their registration at registration desk.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  4
                </span>
                <span className="text-base md:text-lg">For the events, participants are requested to provide team details at the registration desk before the commencement of the event.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  5
                </span>
                <span className="text-base md:text-lg">Registration kit will be provided to the registered participants.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  6
                </span>
                <span className="text-base md:text-lg">Lunch and refreshment will be provided to the registered participants.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  7
                </span>
                <span className="text-base md:text-lg">Kindly bring your College ID card and the Payment details if paid online (screenshot).</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  8
                </span>
                <span className="text-base md:text-lg">Online registration can be done through the QR code or link below.</span>
              </li>
              <li 
                className="flex items-start gap-3"
                style={{ color: theme.columbiaBlue }}
              >
                <span 
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 mt-0.5 text-sm font-bold"
                  style={{ backgroundColor: theme.uclaBlue, color: theme.aliceBlue }}
                >
                  9
                </span>
                <span className="text-base md:text-lg">Onspot registration is also available on the event day.</span>
              </li>
            </ul>
          </div>

          {/* Payment Process Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Payment style={{ color: theme.uclaBlue, fontSize: 28 }} />
              <h2 
                className="text-2xl md:text-3xl font-bold pb-2"
                style={{ color: theme.uclaBlue, borderBottom: `2px solid ${theme.uclaBlue}` }}
              >
                Payment Process
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              <div 
                className="p-6 rounded-lg transform transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: theme.aliceBlue,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                }}
              >
                <div className="text-center mb-3 font-medium flex items-center justify-center gap-2" 
                  style={{ color: theme.berkeleyBlue }}
                >
                  <QrCode2 />
                  <span className="text-lg">Scan for Instructions</span>
                </div>
                {/* Placeholder for QR code - replace with your actual QR code */}
                <div className="w-48 h-48 bg-white flex items-center justify-center rounded-lg overflow-hidden border-2" 
                  style={{ borderColor: theme.uclaBlue }}
                >
                  <Image 
                    src="/TransactionQR.png" 
                    alt="Payment QR Code" 
                    width={180} 
                    height={180}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p 
                  className="mb-4 text-lg md:text-xl"
                  style={{ color: theme.columbiaBlue }}
                >
                  Or click to download payment instructions
                </p>
                <a 
                  href="https://clement2004.blob.core.windows.net/techutsav25/Payment_process_techutsav2025.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 group"
                  style={{
                    backgroundColor: theme.uclaBlue,
                    color: theme.aliceBlue,
                    border: `2px solid ${theme.uclaBlue}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.uclaBlue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.uclaBlue;
                    e.currentTarget.style.color = theme.aliceBlue;
                  }}
                >
                  <Download className="group-hover:translate-y-[2px] transition-transform" />
                  Download Instructions
                </a>
              </div>
            </div>
          </div>

          {/* Eligible Participants Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <School style={{ color: theme.uclaBlue, fontSize: 28 }} />
              <h2 
                className="text-2xl md:text-3xl font-bold pb-2"
                style={{ color: theme.uclaBlue, borderBottom: `2px solid ${theme.uclaBlue}` }}
              >
                Eligible Participants
              </h2>
            </div>
            <div 
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: `${theme.uclaBlue}15` }}
            >
              <p 
                className="text-xl md:text-2xl font-medium"
                style={{ color: theme.columbiaBlue }}
              >
                Participants from all streams are eligible
              </p>
            </div>
          </div>

          {/* Benefits Section - New */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <EventNote style={{ color: theme.uclaBlue, fontSize: 28 }} />
              <h2 
                className="text-2xl md:text-3xl font-bold pb-2"
                style={{ color: theme.uclaBlue, borderBottom: `2px solid ${theme.uclaBlue}` }}
              >
                What You Get
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-4 rounded-lg flex items-start gap-3 transition-transform hover:translate-y-[-4px]"
                style={{ backgroundColor: `${theme.uclaBlue}15` }}
              >
                <Badge style={{ color: theme.uclaBlue, fontSize: 24 }} />
                <div>
                  <h3 
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.uclaBlue }}
                  >
                    Registration Kit
                  </h3>
                  <p style={{ color: theme.columbiaBlue }}>
                    Receive a complete registration kit with event materials and goodies
                  </p>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg flex items-start gap-3 transition-transform hover:translate-y-[-4px]"
                style={{ backgroundColor: `${theme.uclaBlue}15` }}
              >
                <Restaurant style={{ color: theme.uclaBlue, fontSize: 24 }} />
                <div>
                  <h3 
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.uclaBlue }}
                  >
                    Food & Refreshments
                  </h3>
                  <p style={{ color: theme.columbiaBlue }}>
                    Enjoy complimentary lunch and refreshments throughout the event
                  </p>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg flex items-start gap-3 transition-transform hover:translate-y-[-4px]"
                style={{ backgroundColor: `${theme.uclaBlue}15` }}
              >
                <School style={{ color: theme.uclaBlue, fontSize: 24 }} />
                <div>
                  <h3 
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.uclaBlue }}
                  >
                    Learning Opportunities
                  </h3>
                  <p style={{ color: theme.columbiaBlue }}>
                    Access to workshops and technical sessions led by industry experts
                  </p>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg flex items-start gap-3 transition-transform hover:translate-y-[-4px]"
                style={{ backgroundColor: `${theme.uclaBlue}15` }}
              >
                <EventNote style={{ color: theme.uclaBlue, fontSize: 24 }} />
                <div>
                  <h3 
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.uclaBlue }}
                  >
                    Participation Certificate
                  </h3>
                  <p style={{ color: theme.columbiaBlue }}>
                    Receive a certificate of participation for your resume
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div 
              className="p-6 rounded-lg mb-8"
              style={{ 
                background: `linear-gradient(135deg, ${theme.berkeleyBlue}30, ${theme.uclaBlue}30)`,
                border: `1px solid ${theme.uclaBlue}50`
              }}
            >
              <h3 
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: theme.aliceBlue }}
              >
                Ready to join PANORAMA'25?
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ color: theme.columbiaBlue }}
              >
                Don't miss this opportunity to be part of the 5th edition of this exciting tech event!
              </p>
              
              <a 
                href="https://www.techutsavtce.tech/signup" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-md font-bold text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: theme.uclaBlue,
                  color: theme.aliceBlue,
                  border: `2px solid ${theme.uclaBlue}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.uclaBlue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.uclaBlue;
                  e.currentTarget.style.color = theme.aliceBlue;
                }}
              >
                Register Now
              </a>
            </div>
            
            <p 
              className="text-sm"
              style={{ color: theme.columbiaBlue }}
            >
              For any queries, please contact us at <a 
                href="mailto:admin@techutsav.tech" 
                className="underline hover:text-uclaBlue transition-colors"
                style={{ color: theme.uclaBlue }}
              >
                admin@techutsav.tech
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
