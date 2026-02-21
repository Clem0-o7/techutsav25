"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "./FileUpload"
import { Upload, CheckCircle, Clock, AlertCircle, FileText, ExternalLink, Download, Users } from "lucide-react"

const STATUS_ICONS = {
  draft: Clock,
  submitted: CheckCircle,
  reviewed: Clock,
  accepted: CheckCircle,
  rejected: AlertCircle,
  overridden: AlertCircle
}

const STATUS_COLORS = {
  draft: "text-yellow-500",
  submitted: "text-blue-500", 
  reviewed: "text-purple-500",
  accepted: "text-green-500",
  rejected: "text-red-500",
  overridden: "text-gray-500"
}

export function SubmissionCard({ 
  eventType, 
  details, 
  hasRequiredPass, 
  submission, 
  user,
  onSubmissionUpdate,
  loading: parentLoading = false
}) {
  const [showUpload, setShowUpload] = useState(false)
  const [loading, setLoading] = useState(false)

  // Debug logging for submission data
  console.log(`[${eventType}] Submission data:`, submission)

  const StatusIcon = submission ? STATUS_ICONS[submission.status] : Upload

  // Helper function to download file
  const handleFileDownload = (fileUrl, fileName) => {
    try {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName || 'submission'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab
      window.open(fileUrl, '_blank')
    }
  }

  const handleSubmissionSuccess = async (result) => {
    setShowUpload(false)
    console.log('Submission successful:', result)
    await onSubmissionUpdate() // Wait for the data refresh
    
    // Show success feedback
    if (result?.submission?.status === 'submitted') {
      // Optional: Add toast notification here if you have a toast system
      console.log('Submission completed successfully!')
    } else if (result?.submission?.status === 'draft') {
      console.log('Draft saved successfully!')
    }
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
                  <span className={`text-sm ${STATUS_COLORS[submission.status]} capitalize font-medium flex items-center gap-1`}>
                    <StatusIcon className="w-4 h-4" />
                    {submission.status === 'draft' ? 'Draft Saved' : submission.status}
                  </span>
                </div>
                
                {submission.fileName && submission.fileUrl ? (
                  <div className="text-sm space-y-2">
                    <div className="text-muted-foreground">
                      <span className="font-medium">File: </span>
                      <span className="text-foreground">{submission.fileName}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.open(submission.fileUrl, '_blank')}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View File
                      </button>
                      <button 
                        onClick={() => handleFileDownload(submission.fileUrl, submission.fileName)}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline inline-flex items-center gap-1 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  </div>
                ) : submission.fileName ? (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">File:</span> {submission.fileName}
                    <span className="text-xs text-red-500 ml-2">(File not accessible)</span>
                  </div>
                ) : null}
                
                {submission.title && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Title:</span> {submission.title}
                  </div>
                )}
                
                {submission.abstract && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Abstract:</span> 
                    <p className="mt-1 text-xs bg-muted p-2 rounded">
                      {submission.abstract.length > 150 
                        ? `${submission.abstract.substring(0, 150)}...` 
                        : submission.abstract
                      }
                    </p>
                  </div>
                )}
                
                {submission.submittedDate && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted:</span> {new Date(submission.submittedDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                )}
                
                {submission.reviews && submission.reviews.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-medium text-sm">Reviews:</span>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {submission.reviews.map((review, index) => (
                        <div key={index} className="bg-muted/50 p-2 rounded text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{review.reviewerName || 'Reviewer'}</span>
                            <span className="text-primary">Score: {review.score}/10</span>
                          </div>
                          {review.comments && (
                            <p className="text-muted-foreground">
                              {review.comments.length > 100 
                                ? `${review.comments.substring(0, 100)}...` 
                                : review.comments
                              }
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {submission.isTeamSubmission && (
                  <div className="space-y-2">
                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      <span className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Team Submission
                      </span>
                      {submission.teamId && (
                        <p className="text-xs text-blue-500 mt-1">
                          Team ID: {submission.teamId}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {submission.status === 'overridden' && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                    <span className="font-medium">⚠ Overridden by team submission</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {submission.status === "draft" && (
                    <Button 
                      onClick={() => setShowUpload(true)} 
                      size="sm" 
                      className="flex-1"
                      disabled={loading || parentLoading}
                    >
                      {parentLoading ? "Refreshing..." : "Complete & Submit"}
                    </Button>
                  )}
                  
                  {submission.status === "submitted" && (
                    <Button 
                      onClick={() => setShowUpload(true)} 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      disabled={loading || parentLoading}
                    >
                      {parentLoading ? "Refreshing..." : "Update Submission"}
                    </Button>
                  )}
                  
                  {submission.status !== "overridden" && (
                    <Button 
                      onClick={handleWithdraw} 
                      variant="outline" 
                      size="sm" 
                      disabled={loading || parentLoading || !["draft", "submitted"].includes(submission.status)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      {loading ? "Withdrawing..." : "Withdraw"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setShowUpload(true)} 
                className="w-full"
                disabled={loading || parentLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {parentLoading ? "Loading..." : `Submit ${details.title}`}
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