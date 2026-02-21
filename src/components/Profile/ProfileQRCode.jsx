"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QRCodeCanvas } from "./QRCodeCanvas"
import { DigitalPassTemplate } from "./DigitalPassTemplate"

const PASS_NAMES = {
  1: "Offline Workshop + All Events",
  2: "Online Paper Presentation", 
  3: "Online Idea Pitching",
  4: "Online Workshops",
}

export function ProfileQRCode({ userId, passes, userName }) {
  const digitalPassRef = useRef(null)
  const hiddenQRRef = useRef(null)
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrDataURL, setQrDataURL] = useState(null)
  const [isExporting, setIsExporting] = useState(false)

  // Only show digital pass for Pass 1 (Offline Workshop + All Events)
  const verifiedPass1 = passes?.find(p => p.passType === 1 && p.status === "verified")
  const hasOfflinePass = !!verifiedPass1

  // Sanitize user name for file downloads
  const sanitizedName = userName ? userName.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : userId

  const handleQRGenerated = (success) => {
    setQrGenerated(success)
    if (success && hiddenQRRef.current) {
      // Get QR code as data URL for template
      const canvas = hiddenQRRef.current.querySelector('canvas')
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png')
        setQrDataURL(dataURL)
      }
    }
  }



  const downloadQR = () => {
    if (qrDataURL) {
      const link = document.createElement("a")
      link.download = `techutsav-qr-${sanitizedName}.png`
      link.href = qrDataURL
      link.click()
    }
  }

const downloadDigitalPass = async () => {
  if (!digitalPassRef.current || !qrGenerated || !qrDataURL) {
    alert("Please wait for QR code to generate")
    return
  }

  try {
    // Step 1: Enable export mode
    setIsExporting(true)
    
    // Step 2: Wait for fonts and DOM updates
    await document.fonts.ready
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const html2canvas = (await import("html2canvas")).default
    const element = digitalPassRef.current
    const rect = element.getBoundingClientRect()

    // Step 3: Capture high-quality PNG
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#0b0b0b",
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0
    })

    // Step 4: Download PNG
    const link = document.createElement("a")
    link.download = "TechUtsav-Pass.png"
    link.href = canvas.toDataURL("image/png", 1.0)
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
  } catch (err) {
    console.error("PNG export failed:", err)
    alert("Pass download failed. Please try again.")
  } finally {
    // Step 5: Disable export mode
    setIsExporting(false)
  }
}

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">Your Digital Pass</CardTitle>
        <CardDescription>
          {hasOfflinePass 
            ? "Official digital pass for TechUtsav 2026 - Offline Workshop & All Events"
            : "Purchase Pass 1 (Offline Workshop + All Events) to generate your digital event pass"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 p-6">
        {hasOfflinePass ? (
          <div className="w-full max-w-none flex flex-col items-center space-y-6">
            {/* Hidden QR Generator */}
            <div style={{ display: 'none' }} ref={hiddenQRRef}>
              <QRCodeCanvas 
                data={hasOfflinePass ? userId : null}
                onGenerated={handleQRGenerated}
              />
            </div>

            {/* Digital Pass Design */}
            <div className="w-full flex justify-center">
              <DigitalPassTemplate
                ref={digitalPassRef}
                userName={userName}
                userId={userId}
                qrCodeDataURL={qrDataURL}
                isExporting={isExporting}
              />
            </div>

            <div className="flex gap-3 w-full max-w-md">
              {qrGenerated ? (
                <Button 
                  onClick={downloadDigitalPass} 
                  className="flex-1"
                >
                  � Download Pass (PNG)
                </Button>
              ) : (
                <Button 
                  disabled 
                  className="flex-1"
                >
                  Generating QR Code...
                </Button>
              )}
              {qrGenerated && (
                <Button 
                  onClick={downloadQR} 
                  variant="outline"
                  className="flex-1"
                >
                  📱 Download QR Only
                </Button>
              )}
            </div>
            
            <div className="bg-accent border border-border rounded-lg p-4 w-full max-w-md">
              <div className="flex items-center space-x-2">
                <span className="text-primary text-lg">✓</span>
                <div>
                  <h4 className="text-sm font-semibold text-accent-foreground">Pass Verified</h4>
                  <p className="text-xs text-muted-foreground">
                    Verified on {new Date(verifiedPass1.verifiedDate || verifiedPass1.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center max-w-md">
              💡 Your digital pass replaces physical ID cards. Save the PDF to your phone for easy access at the venue.
            </p>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 w-full max-w-md">
            <div className="w-20 h-20 mx-auto bg-muted rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">Digital Pass Unavailable</h4>
              <p className="text-sm text-muted-foreground">
                Purchase and verify <strong>Pass 1 (Offline Workshop + All Events)</strong> to generate your official digital pass
              </p>
            </div>
            <div className="bg-accent border border-border rounded-lg p-4">
              <h5 className="font-semibold text-accent-foreground text-sm mb-2">🎫 Pass 1 Benefits:</h5>
              <ul className="text-xs text-accent-foreground space-y-1 text-left">
                <li>• Access to all offline workshops</li>
                <li>• Entry to all 15+ events</li>
                <li>• Digital pass for venue access</li>
                <li>• Priority seating and benefits</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
