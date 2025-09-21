"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, DollarSign, Play, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface VideoCourse {
  id: string
  title: string
  description: string
  level: string
  duration: string
  price: number
  is_featured: boolean
  video_url?: string
  image_url?: string
  created_at: string
  updated_at: string
}

interface VideoCourseManagementProps {
  initialVideoCourses: VideoCourse[]
}

export function VideoCourseManagement({ initialVideoCourses }: VideoCourseManagementProps) {
  const [videoCourses, setVideoCourses] = useState(initialVideoCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const filteredVideoCourses = videoCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && course.is_featured) ||
      (filter === "level" && course.level.toLowerCase() === filter)
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video course?")) return

    try {
      const response = await fetch(`/api/video-courses/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setVideoCourses(videoCourses.filter((course) => course.id !== id))
      } else {
        alert("Failed to delete video course")
      }
    } catch (error) {
      console.error("Error deleting video course:", error)
      alert("Failed to delete video course")
    }
  }

  const featuredCount = videoCourses.filter((course) => course.is_featured).length
  const totalRevenue = videoCourses.reduce((sum, course) => sum + (course.price || 0), 0)

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Video Courses</h1>
              <p className="text-muted-foreground">Create and manage your video course content</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/video-courses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Video Course
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
                  placeholder="Search video courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All Courses
                </Button>
                <Button
                  variant={filter === "featured" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("featured")}
                >
                  Featured
                </Button>
                <Button
                  variant={filter === "beginner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("beginner")}
                >
                  Beginner
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Courses List */}
        <div className="space-y-4">
          {filteredVideoCourses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No video courses found.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/video-courses/new">Create your first video course</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredVideoCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      {/* Video Thumbnail */}
                      <div className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {course.image_url ? (
                          <img
                            src={course.image_url || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-2">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          {course.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                          <Badge variant="outline">{course.level}</Badge>
                        </div>

                        <p className="text-muted-foreground">{course.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${course.price}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <span>Created: {new Date(course.created_at).toLocaleDateString()}</span>
                          {course.updated_at !== course.created_at && (
                            <span>Updated: {new Date(course.updated_at).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/video-courses/${course.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/video-courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Video Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videoCourses.length}</div>
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  videoCourses.filter((course) => {
                    const courseDate = new Date(course.created_at)
                    const now = new Date()
                    return courseDate.getMonth() === now.getMonth() && courseDate.getFullYear() === now.getFullYear()
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
