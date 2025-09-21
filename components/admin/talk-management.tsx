"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Talk {
  id: string
  title: string
  description: string
  date: string
  location: string
  event_name?: string
  is_featured: boolean
  image_url?: string
  slides_url?: string
  video_url?: string
  created_at: string
  updated_at: string
}

interface TalkManagementProps {
  initialTalks: Talk[]
}

export function TalkManagement({ initialTalks }: TalkManagementProps) {
  const [talks, setTalks] = useState(initialTalks)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const filteredTalks = talks.filter((talk) => {
    const matchesSearch =
      talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (talk.event_name && talk.event_name.toLowerCase().includes(searchTerm.toLowerCase()))

    const now = new Date()
    const talkDate = new Date(talk.date)
    const matchesFilter =
      filter === "all" ||
      (filter === "upcoming" && talkDate >= now) ||
      (filter === "past" && talkDate < now) ||
      (filter === "featured" && talk.is_featured)

    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this talk?")) return

    try {
      const response = await fetch(`/api/talks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTalks(talks.filter((talk) => talk.id !== id))
      } else {
        alert("Failed to delete talk")
      }
    } catch (error) {
      console.error("Error deleting talk:", error)
      alert("Failed to delete talk")
    }
  }

  const now = new Date()
  const upcomingTalks = talks.filter((talk) => new Date(talk.date) >= now)
  const pastTalks = talks.filter((talk) => new Date(talk.date) < now)
  const featuredCount = talks.filter((talk) => talk.is_featured).length

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Talks & Events</h1>
              <p className="text-muted-foreground">Manage your speaking engagements and events</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/talks/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Talk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search talks and events..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All Talks
                </Button>
                <Button
                  variant={filter === "upcoming" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </Button>
                <Button variant={filter === "past" ? "default" : "outline"} size="sm" onClick={() => setFilter("past")}>
                  Past
                </Button>
                <Button
                  variant={filter === "featured" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("featured")}
                >
                  Featured
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Talks List */}
        <div className="space-y-4">
          {filteredTalks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No talks found.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/talks/new">Add your first talk</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTalks.map((talk) => {
              const talkDate = new Date(talk.date)
              const isUpcoming = talkDate >= now
              const isPast = talkDate < now

              return (
                <Card key={talk.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        {/* Event Image */}
                        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {talk.image_url ? (
                            <img
                              src={talk.image_url || "/placeholder.svg"}
                              alt={talk.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-semibold">{talk.title}</h3>
                            {talk.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                            {isUpcoming && <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>}
                            {isPast && <Badge variant="outline">Past</Badge>}
                          </div>

                          <p className="text-muted-foreground">{talk.description}</p>

                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{talkDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{talk.location}</span>
                            </div>
                            {talk.event_name && <span>Event: {talk.event_name}</span>}
                          </div>

                          <div className="flex items-center space-x-4 text-sm">
                            {talk.slides_url && (
                              <a
                                href={talk.slides_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Slides
                              </a>
                            )}
                            {talk.video_url && (
                              <a
                                href={talk.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Watch Video
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/talks/${talk.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/talks/${talk.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(talk.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Talks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{talks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingTalks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Past Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastTalks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredCount}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
