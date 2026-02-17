"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PASS_NAMES = {
  1: "Offline Workshop + All Events",
  2: "Online Paper Presentation",
  3: "Online Idea Pitching",
  4: "Online Workshops",
}

export function ProfileQRCode({ userId, userName, passes }) {
  const canvasRef = useRef(null)
  const [qrGenerated, setQrGenerated] = useState(false)

  useEffect(() => {
    if (userId && canvasRef.current) {
      generateQRCode()
    }
  }, [userId, passes])

  // Get verified passes
  const verifiedPasses = passes?.filter(p => p.status === "verified") || []

  const generateQRCode = async () => {
    try {
      const qrData = JSON.stringify({
        userId,
        userName,
        event: "TechUtsav Paradigm '26",
        passes: verifiedPasses.map(p => ({
          type: p.passType,
          name: PASS_NAMES[p.passType],
          verifiedDate: p.verifiedDate
        })),
        timestamp: new Date().toISOString()
      })

      await QRCode.toCanvas(canvasRef.current, qrData, {
        width: 250,
        margin: 2,
        color: {
          dark: "#E50914",
          light: "#000000"
        }
      })
      setQrGenerated(true)
    } catch (error) {
      console.error("QR Code generation error:", error)
    }
  }

  const downloadQR = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `techutsav-qr-${userId}.png`
      link.href = url
      link.click()
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">Your QR Code</CardTitle>
        <CardDescription>
          {verifiedPasses.length > 0 
            ? `${verifiedPasses.length} verified pass${verifiedPasses.length > 1 ? 'es' : ''}`
            : "No verified passes yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-black rounded-lg">
          <canvas ref={canvasRef} className="rounded" />
        </div>
        
        {verifiedPasses.length > 0 && (
          <div className="w-full space-y-2">
            <h4 className="text-sm font-semibold text-foreground text-center">Verified Passes:</h4>
            <ul className="space-y-1">
              {verifiedPasses.map((pass) => (
                <li key={pass.passType} className="flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500 mr-2">✓</span>
                  {PASS_NAMES[pass.passType]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {qrGenerated && (
          <Button onClick={downloadQR} variant="outline">
            Download QR Code
          </Button>
        )}
        
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Show this QR code at the venue for quick registration and event participation
        </p>
      </CardContent>
    </Card>
  )
}
