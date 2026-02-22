"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, UserPlus, Copy, Lock } from "lucide-react"

export function TeamManagement({ user, onTeamUpdate }) {
  const [activeTab, setActiveTab] = useState("status")
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([])
  const [createForm, setCreateForm] = useState({
    eventType: "paper-presentation",
    teamName: ""
  })
  const [joinCode, setJoinCode] = useState("")

  // Derive which event types the user has the required pass for
  const REQUIRED_PASSES = {
    "paper-presentation": [2],
    "ideathon": [3],
  }
  const hasPassFor = (eventType) =>
    user?.passes?.some(
      (p) => REQUIRED_PASSES[eventType].includes(p.passType) && p.status === "verified"
    ) ?? false

  const canCreatePaper = hasPassFor("paper-presentation")
  const canCreateIdeathon = hasPassFor("ideathon")
  const canCreateAny = canCreatePaper || canCreateIdeathon

  // Keep form eventType in sync: if the default option is locked, switch to an available one
  useEffect(() => {
    if (!hasPassFor(createForm.eventType)) {
      if (canCreatePaper) setCreateForm((p) => ({ ...p, eventType: "paper-presentation" }))
      else if (canCreateIdeathon) setCreateForm((p) => ({ ...p, eventType: "ideathon" }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Fetch teams on component mount
  useEffect(() => {
    if (activeTab === "status") {
      fetchTeams()
    }
  }, [activeTab])

  // Fetch user teams
  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams/status", {
        credentials: "include"
      })
      if (response.ok) {
        const data = await response.json()
        setTeams(data.teams || [])
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error)
    }
  }

  // Create team
  const handleCreateTeam = async (e) => {
    e.preventDefault()
    if (!createForm.teamName.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
        credentials: "include"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create team")
      }

      const data = await response.json()
      setTeams(prev => [...prev, data.team])
      setCreateForm({ eventType: "paper-presentation", teamName: "" })
      setActiveTab("status")
      onTeamUpdate()
    } catch (error) {
      console.error("Create team error:", error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Join team
  const handleJoinTeam = async (e) => {
    e.preventDefault()
    if (!joinCode.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode.trim() }),
        credentials: "include"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to join team")
      }

      const data = await response.json()
      setTeams(prev => [...prev, data.team])
      setJoinCode("")
      setActiveTab("status")
      onTeamUpdate()
    } catch (error) {
      console.error("Join team error:", error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Copy invite code
  const copyInviteCode = (inviteCode) => {
    navigator.clipboard.writeText(inviteCode)
    alert("Invite code copied to clipboard!")
  }

  // Leave team
  const handleLeaveTeam = async (team) => {
    const myMember = team.members?.find(
      (m) => m.userId === user?._id?.toString()
    )
    const isLeader = myMember?.role === "leader"
    const hasTeamSub = user?.submissions?.some(
      (s) =>
        s.type === team.eventType &&
        s.finalSubmission === true &&
        s.isTeamSubmission === true &&
        s.teamId?.toString() === team._id?.toString()
    )
    const remainingMembers = (team.members?.length ?? 1) - 1

    const nextMemberName =
      team.members?.find((m) => m.userId !== user?._id?.toString())?.name

    let confirmMessage
    if (isLeader && hasTeamSub && remainingMembers > 0) {
      confirmMessage =
        `⚠ You are the team leader and the current submitter.\n\n` +
        `Your submission will be transferred to ${nextMemberName ?? "the next member"} ` +
        `(new leader) — the team's submission stays active.\n\n` +
        `Are you sure you want to leave?`
    } else if (isLeader && hasTeamSub && remainingMembers === 0) {
      confirmMessage =
        `⚠ You are the only member and the current submitter.\n\n` +
        `Leaving will dissolve the team and permanently delete your team submission.\n\n` +
        `Are you sure you want to leave?`
    } else if (!isLeader && hasTeamSub && remainingMembers > 0) {
      confirmMessage =
        `⚠ You are the current submitter for this team.\n\n` +
        `Your submission will be transferred to the team leader ` +
        `— the team's submission stays active.\n\n` +
        `Are you sure you want to leave?`
    } else if (isLeader && remainingMembers > 0) {
      confirmMessage =
        `You are the team leader.\n` +
        `Leadership will transfer to ${nextMemberName ?? "the next member"}.\n\n` +
        `Are you sure you want to leave?`
    } else if (isLeader) {
      confirmMessage =
        `You are the only member. Leaving will dissolve the team.\n\nAre you sure?`
    } else {
      confirmMessage = "Are you sure you want to leave this team?"
    }

    if (!confirm(confirmMessage)) return

    setLoading(true)
    try {
      const response = await fetch("/api/teams/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: team._id }),
        credentials: "include"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to leave team")
      }

      setTeams(prev => prev.filter(t => t._id !== team._id))
      onTeamUpdate()
    } catch (error) {
      console.error("Leave team error:", error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Management
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Tab Navigation */}
        <div className="flex mb-4 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "status"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Teams
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "create"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Team
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "join"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Join Team
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "status" && (
          <div className="space-y-3">
            {teams.length > 0 ? (
              teams.map(team => (
                <div key={team._id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{team.teamName}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {team.eventType ? team.eventType.replace("-", " ") : "Unknown Event"}
                      </p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {team.members?.length || 0}/{team.maxMembers} members
                    </span>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-1">
                    {team.members?.map(member => {
                      const isMe = member.userId === user?._id?.toString()
                      return (
                        <div key={member._id} className="flex items-center gap-2 text-sm">
                          <span className={isMe ? "font-semibold text-primary" : "text-muted-foreground"}>
                            {member.name}{isMe ? " (You)" : ""}
                          </span>
                          {member.role === "leader" && (
                            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                              Leader
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Team Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => copyInviteCode(team.inviteCode)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Invite: {team.inviteCode}
                    </Button>
                    <Button
                      onClick={() => handleLeaveTeam(team)}
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Leave
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>You're not part of any teams yet</p>
                <p className="text-sm">Create a new team or join an existing one</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "create" && (
          <form onSubmit={handleCreateTeam} className="space-y-4">
            {/* No-pass gate */}
            {!canCreateAny && (
              <div className="flex items-start gap-2 rounded-lg border border-dashed p-3 bg-muted/30">
                <Lock className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-muted-foreground">Pass required</p>
                  <p className="text-xs text-muted-foreground">
                    You need a verified Pass 2 (Paper Presentation) or Pass 3 (Ideathon) to create a team.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <select
                id="eventType"
                value={createForm.eventType}
                onChange={(e) => setCreateForm(prev => ({ ...prev, eventType: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                disabled={loading || !canCreateAny}
              >
                <option value="paper-presentation" disabled={!canCreatePaper}>
                  Paper Presentation{!canCreatePaper ? " (Pass 2 required)" : ""}
                </option>
                <option value="ideathon" disabled={!canCreateIdeathon}>
                  Ideathon{!canCreateIdeathon ? " (Pass 3 required)" : ""}
                </option>
              </select>
              {hasPassFor(createForm.eventType) && (
                <p className="text-xs text-muted-foreground">
                  Max members: {createForm.eventType === "ideathon" ? "2" : "10"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={createForm.teamName}
                onChange={(e) => setCreateForm(prev => ({ ...prev, teamName: e.target.value }))}
                placeholder="Enter team name"
                disabled={loading || !canCreateAny}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !createForm.teamName.trim() || !canCreateAny || !hasPassFor(createForm.eventType)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        )}

        {activeTab === "join" && (
          <form onSubmit={handleJoinTeam} className="space-y-4">
            {/* Inform user which events they can join */}
            {(!canCreatePaper || !canCreateIdeathon) && (
              <div className="rounded-lg border border-dashed p-3 bg-muted/30 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pass status</p>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-xs flex items-center gap-1 ${
                    canCreatePaper ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                  }`}>
                    {canCreatePaper ? "✓" : <Lock className="w-3 h-3" />} Paper Presentation (Pass 2)
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${
                    canCreateIdeathon ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                  }`}>
                    {canCreateIdeathon ? "✓" : <Lock className="w-3 h-3" />} Ideathon (Pass 3)
                  </span>
                </div>
                {!canCreatePaper && !canCreateIdeathon && (
                  <p className="text-xs text-muted-foreground pt-1">
                    You need a verified pass to join a team for that event.
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="inviteCode">Team Invite Code</Label>
              <Input
                id="inviteCode"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-character invite code"
                maxLength={6}
                disabled={loading || (!canCreatePaper && !canCreateIdeathon)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ask your team leader for the 6-character invite code
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !joinCode.trim() || (!canCreatePaper && !canCreateIdeathon)}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? "Joining..." : "Join Team"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}