"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "./FileUpload"
import { Upload, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"

const STATUS_ICONS = {
  draft: Clock,
  submitted: CheckCircle,
  reviewed: Clock,
  accepted: CheckCircle,
  rejected: AlertCircle
}

const STATUS_COLORS = {
  draft: "text-yellow-500",
  submitted: "text-blue-500", 
  reviewed: "text-purple-500",
  accepted: "text-green-500",
  rejected: "text-red-500"
}

export function SubmissionCard({ 
  eventType, 
  details, 
  hasRequiredPass, 
  submission, 
  user,
  onSubmissionUpdate 
}) {
  const [showUpload, setShowUpload] = useState(false)
  const [loading, setLoading] = useState(false)

  const StatusIcon = submission ? STATUS_ICONS[submission.status] : Upload

  const handleSubmissionSuccess = () => {
    setShowUpload(false)
    onSubmissionUpdate()
  }

  const handleWithdraw = async () => {
    if (!confirm("Are you sure you want to withdraw your submission?")) return

    setLoading(true)
    try {
      const response = await fetch("/api/submissions/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType }),
        credentials: "include"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to withdraw submission")
      }

      onSubmissionUpdate()
    } catch (error) {
      console.error("Withdrawal error:", error)
      alert(error.message || "Failed to withdraw submission")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`${hasRequiredPass ? "" : "opacity-50 bg-gray-50 border-gray-200"} transition-all`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {details.title}
          </span>
          {submission && (
            <div className={`flex items-center gap-1 text-sm ${STATUS_COLORS[submission.status]}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="capitalize">{submission.status}</span>
            </div>
          )}
        </CardTitle>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Submission Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-foreground">Deadline:</span>
            <p className="text-muted-foreground">{details.deadline}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Max Size:</span>
            <p className="text-muted-foreground">{details.maxSize}</p>
          </div>
        </div>

        <div className="text-sm">
          <span className="font-medium text-foreground">Allowed Types:</span>
          <p className="text-muted-foreground">{details.allowedTypes.join(", ")}</p>
        </div>

        {/* Submission Status */}
        {hasRequiredPass ? (
          <div className="space-y-3">
            {submission ? (
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Current Submission:</span>
                  <span className={`text-sm ${STATUS_COLORS[submission.status]} capitalize`}>
                    {submission.status}
                  </span>
                </div>
                
                {submission.fileName && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">File:</span> {submission.fileName}
                  </div>
                )}
                
                {submission.title && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Title:</span> {submission.title}
                  </div>
                )}
                
                {submission.submittedDate && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted:</span> {new Date(submission.submittedDate).toLocaleDateString()}
                  </div>
                )}

                <div className="flex gap-2">
                  {submission.status === "draft" && (
                    <Button 
                      onClick={() => setShowUpload(true)} 
                      size="sm" 
                      className="flex-1"
                    >
                      Update Submission
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleWithdraw} 
                    variant="outline" 
                    size="sm" 
                    disabled={loading}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    {loading ? "Withdrawing..." : "Withdraw"}
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setShowUpload(true)} 
                className="w-full"
                disabled={loading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit {details.title}
              </Button>
            )}

            {/* File Upload Modal */}
            {showUpload && (
              <FileUpload
                eventType={eventType}
                details={details}
                onSuccess={handleSubmissionSuccess}
                onCancel={() => setShowUpload(false)}
                existingSubmission={submission}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Get pass to submit
              </p>
              <p className="text-xs text-muted-foreground">
                Purchase Pass {eventType === "paper-presentation" ? "2" : "3"} to unlock submissions
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}