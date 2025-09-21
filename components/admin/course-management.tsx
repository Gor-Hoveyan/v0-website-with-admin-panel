"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  description: string
  level: string
  duration: string
  price: number
  is_featured: boolean
  created_at: string
  updated_at: string
  image_url?: string
}

interface CourseManagementProps {
  initialCourses: Course[]
}

export function CourseManagement({ initialCourses }: CourseManagementProps) {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const filteredCourses = courses.filter((course) => {
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
    if (!confirm("Are you sure you want to delete this course?")) return

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== id))
      } else {
        alert("Failed to delete course")
      }
    } catch (error) {
      console.error("Error deleting course:", error)
      alert("Failed to delete course")
    }
  }

  const featuredCount = courses.filter((course) => course.is_featured).length
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price || 0), 0)

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Courses</h1>
              <p className="text-muted-foreground">Create and manage your course offerings</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/courses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Course
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
                  placeholder="Search courses..."
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

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No courses found.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/courses/new">Create your first course</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
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
                        <span>Duration: {course.duration}</span>
                        <span>Created: {new Date(course.created_at).toLocaleDateString()}</span>
                        {course.updated_at !== course.created_at && (
                          <span>Updated: {new Date(course.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/courses/${course.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/courses/${course.id}/edit`}>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
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
                  courses.filter((course) => {
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
