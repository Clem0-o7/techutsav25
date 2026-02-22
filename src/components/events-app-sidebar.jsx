'use client'

import * as React from "react"
import { useState } from "react"
import { Search, Filter, X, User, LogOut, UserPlus, LogIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Departments (DB aligned)
const departments = ["CSE", "IT", "CSBS", "AMCS", "MCA"]

// Only Tech / Non-Tech
const categories = [
  { id: 'tech', label: 'Technical Events', icon: '💻' },
  { id: 'non-tech', label: 'Non-Technical Events', icon: '🎨' }
]

export function EventsAppSidebar({ filters, onFiltersChange, ...props }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '')
  const { user, logout } = useAuth()

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    onFiltersChange({ ...filters, search: value })
  }

  const handleCategoryChange = (category) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? '' : category
    })
  }

  const handleDepartmentChange = (department) => {
    const current = filters.departments || []
    const updated = current.includes(department)
      ? current.filter(d => d !== department)
      : [...current, department]

    onFiltersChange({ ...filters, departments: updated })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    onFiltersChange({
      search: '',
      category: '',
      departments: []
    })
  }

  const activeCount =
    (filters.category ? 1 : 0) + (filters.departments?.length || 0)

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Filter className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Filter Events</span>
                <span className="text-xs text-sidebar-foreground/70">
                  {activeCount > 0 ? `${activeCount} active` : 'All events'}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6">

        {/* Search */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
      
          </SidebarGroupLabel>
          <div className="px-3 relative">
            <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 h-10"
            />
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-4 top-1/2 h-7 w-7 p-0 -translate-y-1/2"
                onClick={() => handleSearchChange('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </SidebarGroup>

        {/* Tech / Non-Tech */}
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map((cat) => (
              <SidebarMenuItem key={cat.id}>
                <SidebarMenuButton
                  onClick={() => handleCategoryChange(cat.id)}
                  className={filters.category === cat.id ? 'bg-sidebar-accent' : ''}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                  {filters.category === cat.id && (
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Departments */}
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarMenu>
            {departments.map((dept) => (
              <SidebarMenuItem key={dept}>
                <SidebarMenuButton
                  onClick={() => handleDepartmentChange(dept)}
                  className={filters.departments?.includes(dept) ? 'bg-sidebar-accent' : ''}
                >
                  <span>{dept}</span>
                  {filters.departments?.includes(dept) && (
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Clear */}
        {activeCount > 0 && (
          <SidebarGroup>
            <div className="px-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={clearAllFilters}
              >
                <X className="h-4 w-4" />
                Clear Filters ({activeCount})
              </Button>
            </div>
          </SidebarGroup>
        )}

        {/* Auth */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <div className="px-3 space-y-2">
            {user ? (
              <>
                <Button
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => window.location.href = '/profile'}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    logout()
                    window.location.href = '/'
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => window.location.href = '/login'}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => window.location.href = '/signup'}
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </>
            )}
          </div>
        </SidebarGroup>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}