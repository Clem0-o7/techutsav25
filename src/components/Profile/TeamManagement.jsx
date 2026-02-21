"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, UserPlus, Copy, ExternalLink } from "lucide-react"

export function TeamManagement({ user, onTeamUpdate }) {
  const [activeTab, setActiveTab] = useState("status")
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([])
  const [createForm, setCreateForm] = useState({
    eventType: "paper-presentation",
    teamName: ""
  })
  const [joinCode, setJoinCode] = useState("")

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
  const handleLeaveTeam = async (teamId) => {
    if (!confirm("Are you sure you want to leave this team?")) return

    setLoading(true)
    try {
      const response = await fetch("/api/teams/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId }),
        credentials: "include"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to leave team")
      }

      setTeams(prev => prev.filter(t => t._id !== teamId))
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
                    {team.members?.map(member => (
                      <div key={member._id} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{member.name}</span>
                        {member.role === "leader" && (
                          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                            Leader
                          </span>
                        )}
                      </div>
                    ))}
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
                      onClick={() => handleLeaveTeam(team._id)}
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
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <select
                id="eventType"
                value={createForm.eventType}
                onChange={(e) => setCreateForm(prev => ({ ...prev, eventType: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                disabled={loading}
              >
                <option value="paper-presentation">Paper Presentation</option>
                <option value="ideathon">Ideathon</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Max members: {createForm.eventType === "ideathon" ? "2" : "10"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={createForm.teamName}
                onChange={(e) => setCreateForm(prev => ({ ...prev, teamName: e.target.value }))}
                placeholder="Enter team name"
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" disabled={loading || !createForm.teamName.trim()} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        )}

        {activeTab === "join" && (
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Team Invite Code</Label>
              <Input
                id="inviteCode"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-character invite code"
                maxLength={6}
                disabled={loading}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ask your team leader for the 6-character invite code
              </p>
            </div>

            <Button type="submit" disabled={loading || !joinCode.trim()} className="w-full">
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? "Joining..." : "Join Team"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}