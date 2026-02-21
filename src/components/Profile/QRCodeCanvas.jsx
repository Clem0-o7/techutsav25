"use client"

import { useRef, useEffect, useState } from "react"
import QRCode from "qrcode"

export function QRCodeCanvas({ data, onGenerated }) {
  const canvasRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const generateQR = async () => {
    if (!data || !canvasRef.current) return

    setIsGenerating(true)
    setError(null)

    try {
      await QRCode.toCanvas(canvasRef.current, data, {
        width: 160,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })

      onGenerated?.(true)
    } catch (err) {
      console.error("QR Code generation error:", err)
      setError(err.message)
      onGenerated?.(false)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (data) {
      const timer = setTimeout(generateQR, 100)
      return () => clearTimeout(timer)
    }
  }, [data])

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Label */}
      <p
        className="text-[11px] tracking-widest uppercase"
        style={{ color: "#9ca3af" }}
      >
        Access Verification
      </p>

      {/* QR Frame */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
        }}
      >
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          style={{
            display: "block",
            width: "160px",
            height: "160px",
            backgroundColor: "#ffffff",
          }}
        />
      </div>

      {/* Status text */}
      {isGenerating && (
        <p className="text-[11px] text-gray-500 font-mono">
          Establishing secure signal…
        </p>
      )}

      {!isGenerating && !error && (
        <p
          className="text-[11px] font-mono tracking-wide"
          style={{ color: "#9ca3af" }}
        >
          Signal locked • Awaiting validation
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-500 font-mono">
          Signal failure
          <button
            onClick={generateQR}
            className="ml-2 underline text-blue-500"
          >
            Retry
          </button>
        </p>
      )}
    </div>
  )
}