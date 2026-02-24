"use client"

import { useState, useEffect } from "react"
import { SubmissionCard } from "./SubmissionCard"
import { TeamManagement } from "./TeamManagement"

// Pass requirements for each submission type
const SUBMISSION_PASS_REQUIREMENTS = {
  "paper-presentation": [2], // Pass 2: Online Paper Presentation
  "ideathon": [3]           // Pass 3: Online Idea Pitching
};

const SUBMISSION_DETAILS = {
  "paper-presentation": {
    title: "Paper Presentation",
    description: "Submit your research paper in IEEE format",
    deadline: "February 25, 2026",
    allowedTypes: [".pdf", ".doc", ".docx"],
    maxSize: "10MB"
  },
  "ideathon": {
    title: "Ideathon Submission",
    description: "Upload your presentation (PPT) with idea details",
    deadline: "February 25, 2026", 
    allowedTypes: [".pdf", ".ppt", ".pptx"],
    maxSize: "20MB"
  }
};

export function SubmissionSection({ user, onDataRefresh }) {
  const [loading, setLoading] = useState(false)

  // Get verified passes
  const verifiedPasses = user?.passes?.filter(p => p.status === "verified") || []
  
  // Check if user has required pass for each submission type
  const hasPassFor = (eventType) => {
    const requiredPasses = SUBMISSION_PASS_REQUIREMENTS[eventType]
    return verifiedPasses.some(pass => requiredPasses.includes(pass.passType))
  }

  // Get user's submission for specific event type (only final/active submissions)
  const getSubmission = (eventType) => {
    // Handle users without submissions field (backward compatibility)
    if (!user?.submissions || !Array.isArray(user.submissions)) {
      return null;
    }
    // Return only final/active submissions to show the current state
    return user.submissions.find(sub => 
      sub.type === eventType && 
      (sub.finalSubmission === true || sub.finalSubmission === undefined) // Backward compatibility
    )
  }

  const refreshData = async () => {
    if (onDataRefresh) {
      setLoading(true)
      try {
        await onDataRefresh()
      } catch (error) {
        console.error('Failed to refresh data:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Event Submissions
        </h2>
        <p className="text-muted-foreground">
          Submit your entries for Paper Presentation and Ideathon events
        </p>
      </div>

      {/* Submission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(SUBMISSION_DETAILS).map(([eventType, details]) => (
          <SubmissionCard
            key={eventType}
            eventType={eventType}
            details={details}
            hasRequiredPass={hasPassFor(eventType)}
            submission={getSubmission(eventType)}
            user={user}
            onSubmissionUpdate={refreshData}
            loading={loading}
          />
        ))}
      </div>

      {/* Team Management Section */}
      <TeamManagement user={user} onTeamUpdate={refreshData} />
    </div>
  )
}