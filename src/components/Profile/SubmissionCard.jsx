"use client"

import { useState, useEffect } from "react"
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
  const [teamInfo, setTeamInfo] = useState(null)
  const [teamCheckLoading, setTeamCheckLoading] = useState(false)
  const [showOverrideConfirm, setShowOverrideConfirm] = useState(false)

  // Debug logging for submission data
  console.log(`[${eventType}] Submission data:`, submission)

  /** Fetch team info on mount (and whenever the submission changes) so the
   *  submitter identity and team member list are always visible on the card. */
  useEffect(() => {
    if (!hasRequiredPass) return
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`/api/submissions/team-check?eventType=${eventType}`, {
          credentials: "include",
        })
        if (!cancelled && res.ok) {
          const data = await res.json()
          setTeamInfo(data)
        }
      } catch {
        // non-fatal – team info is supplementary
      }
    }
    load()
    return () => { cancelled = true }
  // Re-run when submission changes (e.g. after join/leave/submit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType, hasRequiredPass, submission?.status, submission?.isTeamSubmission])

  /** Fetch team status then decide whether to show override warning or upload form */
  const handleOpenSubmit = async () => {
    setTeamCheckLoading(true)
    try {
      const res = await fetch(`/api/submissions/team-check?eventType=${eventType}`, {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setTeamInfo(data)
        // Warn only when submitting would overwrite someone else's work
        if (
          data.hasTeam &&
          data.existingSubmission &&
          !data.existingSubmission.isCurrentUser
        ) {
          setShowOverrideConfirm(true)
        } else {
          setShowUpload(true)
        }
      } else {
        setShowUpload(true)
      }
    } catch {
      setShowUpload(true)
    } finally {
      setTeamCheckLoading(false)
    }
  }

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
    <Card className={`transition-all ${
      hasRequiredPass ? "" : "opacity-60 bg-muted/20 border-dashed"
    }`}>
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
                  <div className="text-sm bg-blue-50 border border-blue-100 rounded-lg p-3 dark:bg-blue-900/20 dark:border-blue-800 space-y-2">
                    {/* Header */}
                    <span className="font-medium flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                      <Users className="w-4 h-4" />
                      Team Submission
                    </span>

                    {/* Who submitted */}
                    {teamInfo?.existingSubmission && (
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <span className="font-semibold">
                          {teamInfo.existingSubmission.isCurrentUser
                            ? "You submitted"
                            : `${teamInfo.existingSubmission.submitterName} submitted`}
                        </span>
                        {teamInfo.existingSubmission.fileName && (
                          <span className="text-blue-500 dark:text-blue-400">
                            {" "}— <em>{teamInfo.existingSubmission.fileName}</em>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Team member list */}
                    {teamInfo?.members && (
                      <ul className="space-y-0.5 pt-1 border-t border-blue-100 dark:border-blue-800">
                        {teamInfo.members.map((m) => {
                          const isSubmitter =
                            teamInfo.existingSubmission?.submitterId === m._id
                          return (
                            <li key={m._id} className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300">
                              <span className={m.isCurrentUser ? "font-semibold" : ""}>
                                {m.name}{m.isCurrentUser ? " (You)" : ""}
                              </span>
                              {m.role === "leader" && (
                                <span className="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-1 rounded">
                                  Leader
                                </span>
                              )}
                              {isSubmitter && (
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-1 rounded">
                                  Submitted
                                </span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )}
                
                {submission.status === 'overridden' && (
                  <div className="text-sm bg-orange-50 border border-orange-100 rounded-lg p-3 dark:bg-orange-900/20 dark:border-orange-800 space-y-2">
                    <span className="font-medium flex items-center gap-1.5 text-orange-700 dark:text-orange-300">
                      <AlertCircle className="w-4 h-4" />
                      Overridden by team submission
                    </span>

                    {/* Show who holds the active team submission */}
                    {teamInfo?.existingSubmission && (
                      <div className="text-xs text-orange-700 dark:text-orange-300">
                        Active submission by{" "}
                        <span className="font-semibold">
                          {teamInfo.existingSubmission.isCurrentUser
                            ? "you"
                            : teamInfo.existingSubmission.submitterName}
                        </span>
                        {teamInfo.existingSubmission.fileName && (
                          <span className="text-orange-500 dark:text-orange-400">
                            {" "}— <em>{teamInfo.existingSubmission.fileName}</em>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Team member list */}
                    {teamInfo?.members && (
                      <ul className="space-y-0.5 pt-1 border-t border-orange-100 dark:border-orange-800">
                        {teamInfo.members.map((m) => {
                          const isSubmitter =
                            teamInfo.existingSubmission?.submitterId === m._id
                          return (
                            <li key={m._id} className="flex items-center gap-1.5 text-xs text-orange-700 dark:text-orange-300">
                              <span className={m.isCurrentUser ? "font-semibold" : ""}>
                                {m.name}{m.isCurrentUser ? " (You)" : ""}
                              </span>
                              {m.role === "leader" && (
                                <span className="bg-orange-200 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200 px-1 rounded">
                                  Leader
                                </span>
                              )}
                              {isSubmitter && (
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-1 rounded">
                                  Active submitter
                                </span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  {submission.status === "draft" && (
                    <Button 
                      onClick={handleOpenSubmit} 
                      size="sm" 
                      className="flex-1"
                      disabled={loading || parentLoading || teamCheckLoading}
                    >
                      {teamCheckLoading ? "Checking team..." : parentLoading ? "Refreshing..." : "Complete & Submit"}
                    </Button>
                  )}
                  
                  {submission.status === "submitted" && (
                    <Button 
                      onClick={handleOpenSubmit} 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      disabled={loading || parentLoading || teamCheckLoading}
                    >
                      {teamCheckLoading ? "Checking team..." : parentLoading ? "Refreshing..." : "Update Submission"}
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
            ) : teamInfo?.hasTeam && teamInfo?.existingSubmission ? (
              /* Team has an active submission but this member didn't submit it */
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Team Submission</span>
                  <span className={`text-sm ${STATUS_COLORS[teamInfo.existingSubmission.status] ?? "text-blue-500"} capitalize font-medium flex items-center gap-1`}>
                    {(() => { const Icon = STATUS_ICONS[teamInfo.existingSubmission.status] ?? CheckCircle; return <Icon className="w-4 h-4" /> })()}
                    {teamInfo.existingSubmission.status}
                  </span>
                </div>

                {teamInfo.existingSubmission.fileUrl && teamInfo.existingSubmission.fileName ? (
                  <div className="text-sm space-y-2">
                    <div className="text-muted-foreground">
                      <span className="font-medium">File: </span>
                      <span className="text-foreground">{teamInfo.existingSubmission.fileName}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(teamInfo.existingSubmission.fileUrl, "_blank")}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View File
                      </button>
                      <button
                        onClick={() => handleFileDownload(teamInfo.existingSubmission.fileUrl, teamInfo.existingSubmission.fileName)}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline inline-flex items-center gap-1 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  </div>
                ) : teamInfo.existingSubmission.fileName ? (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">File:</span> {teamInfo.existingSubmission.fileName}
                  </div>
                ) : null}

                {teamInfo.existingSubmission.title && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Title:</span> {teamInfo.existingSubmission.title}
                  </div>
                )}

                {teamInfo.existingSubmission.submittedDate && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted:</span>{" "}
                    {new Date(teamInfo.existingSubmission.submittedDate).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                    })}
                  </div>
                )}

                {/* Team submission info panel */}
                <div className="text-sm bg-blue-50 border border-blue-100 rounded-lg p-3 dark:bg-blue-900/20 dark:border-blue-800 space-y-2">
                  <span className="font-medium flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                    <Users className="w-4 h-4" />
                    Team Submission
                  </span>
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">
                      {teamInfo.existingSubmission.isCurrentUser
                        ? "You submitted"
                        : `${teamInfo.existingSubmission.submitterName} submitted`}
                    </span>
                    {teamInfo.existingSubmission.fileName && (
                      <span className="text-blue-500 dark:text-blue-400">
                        {" "}— <em>{teamInfo.existingSubmission.fileName}</em>
                      </span>
                    )}
                  </div>
                  {teamInfo.members && (
                    <ul className="space-y-0.5 pt-1 border-t border-blue-100 dark:border-blue-800">
                      {teamInfo.members.map((m) => {
                        const isSubmitter = teamInfo.existingSubmission?.submitterId === m._id
                        return (
                          <li key={m._id} className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300">
                            <span className={m.isCurrentUser ? "font-semibold" : ""}>
                              {m.name}{m.isCurrentUser ? " (You)" : ""}
                            </span>
                            {m.role === "leader" && (
                              <span className="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-1 rounded">Leader</span>
                            )}
                            {isSubmitter && (
                              <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-1 rounded">Submitted</span>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>

                {/* Override button (submits on behalf of the team, replacing existing) */}
                <Button
                  onClick={handleOpenSubmit}
                  size="sm"
                  variant="outline"
                  className="w-full"
                  disabled={loading || parentLoading || teamCheckLoading}
                >
                  {teamCheckLoading ? "Checking team..." : parentLoading ? "Refreshing..." : "Override Team Submission"}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleOpenSubmit} 
                className="w-full"
                disabled={loading || parentLoading || teamCheckLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {teamCheckLoading ? "Checking team..." : parentLoading ? "Loading..." : `Submit ${details.title}`}
              </Button>
            )}

            {/* Override confirmation dialog */}
            {showOverrideConfirm && teamInfo?.existingSubmission && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-background border rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Override team submission?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>{teamInfo.existingSubmission.submitterName}</strong> already submitted{" "}
                        {teamInfo.existingSubmission.fileName
                          ? <><em>&ldquo;{teamInfo.existingSubmission.fileName}&rdquo;</em>.</>  
                          : "a file for this event."}{" "}
                        Your new submission will replace theirs as the team&apos;s active submission.
                      </p>
                    </div>
                  </div>

                  {/* Team members list */}
                  {teamInfo.members && (
                    <div className="bg-muted/40 rounded-lg p-3 space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Team: {teamInfo.teamName}
                      </p>
                      {teamInfo.members.map((m) => (
                        <div key={m._id} className="flex items-center gap-2 text-sm">
                          <span className={m.isCurrentUser ? "font-semibold text-primary" : "text-foreground"}>
                            {m.name}{m.isCurrentUser ? " (You)" : ""}
                          </span>
                          {m.role === "leader" && (
                            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Leader</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => { setShowOverrideConfirm(false); setTeamInfo(null) }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => { setShowOverrideConfirm(false); setShowUpload(true) }}
                    >
                      Yes, Override
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Modal */}
            {showUpload && (
              <FileUpload
                eventType={eventType}
                details={details}
                onSuccess={handleSubmissionSuccess}
                onCancel={() => { setShowUpload(false); setTeamInfo(null) }}
                existingSubmission={submission}
                teamInfo={teamInfo}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Pass required to submit
              </p>
              <p className="text-xs text-muted-foreground">
                Purchase and verify Pass {eventType === "paper-presentation" ? "2" : "3"} to unlock submissions
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}