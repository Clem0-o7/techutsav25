"use client"

import { forwardRef } from "react"

const DigitalPassTemplate = forwardRef(
  ({ userName, userId, qrCodeDataURL, variant = "classified" }, ref) => {
    return (
      <div
        id="pass-export"
        ref={ref}
        className="w-[380px] rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#0b0b0b",
          border: "1px solid #2a2a2a",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          color: "#e5e5e5",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <p
            className="text-[10px] tracking-[0.25em] uppercase leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            PROPERTY OF SECTOR 7 • AUTHORIZED PERSONNEL ONLY
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-wide leading-none">
            TECHUTSAV 
          </h1>

          <p
            className="mt-2 text-sm italic leading-none"
            style={{ color: "#9ca3af" }}
          >
            Paradigm '26
          </p>
        </div>

        <div className="mx-6 h-px bg-[#2a2a2a]" />

        {/* Pass Type */}
        <div className="px-6 py-4 text-center">
          <span
            className="inline-block  px-4 py-1 text-xm font-semibold tracking-wide leading-none"
            style={{
              color: "#e50914",
            }}
          >
            Event Pass
          </span>
          <p className="text-sm font-medium leading-none" style={{ color: "#e5e5e5" }}>
          </p>
        </div>

        {/* Participant */}
        <div className="px-6  text-center">
          <p
            className="text-[11px] tracking-widest uppercase leading-none"
            style={{ color: "#9ca3af" }}
          >
            SUBJECT IDENTIFICATION
          </p>

          <p className="mt-2 px-1 py-1 text-xl font-semibold leading-none">
            {userName || "Subject"}
          </p>

          <p
            className="mt-2 text-xs font-mono tracking-widest leading-none"
            style={{ color: "#9ca3af" }}
          >
            SUBJECT ID • {userId?.slice(-8).toUpperCase()}
          </p>

          {variant === "classified" && (
            <p className="mt-2 text-xs italic leading-none" style={{ color: "#e50914" }}>
              Clearance confirmed by The Party
            </p>
          )}
        </div>

        {/* QR Code */}
        <div className="px-6 py-4 flex flex-col items-center">
          <p
            className="mb-4 text-[10px] tracking-wide uppercase leading-none"
            style={{ color: "#6b7280" }}
          >
            Portal access validation
          </p>
          
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            {qrCodeDataURL ? (
              <img
                src={qrCodeDataURL}
                alt="QR Code"
                width={160}
                height={160}
                style={{ display: "block", imageRendering: "crisp-edges" }}
              />
            ) : (
              <div
                className="flex items-center justify-center text-xs text-gray-500"
                style={{ width: 160, height: 160 }}
              >
                Generating…
              </div>
            )}
          </div>

          <p
            className="mt-4 text-[10px] font-mono tracking-wide leading-none"
            style={{ color: "#9ca3af" }}
          >
            Signal locked • Do you copy?
          </p>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 text-center text-[10px]"
          style={{
            backgroundColor: "#111111",
            color: "#6b7280",
          }}
        >
          The Upside Down Awaits
        </div>
      </div>
    )
  }
)

DigitalPassTemplate.displayName = "DigitalPassTemplate"
export { DigitalPassTemplate }