"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface Course {
  id?: string
  title: string
  description: string
  level: string
  duration: string
  price: number
  is_featured: boolean
  image_url?: string
}

interface CourseEditorProps {
  initialCourse?: Course
}

export function CourseEditor({ initialCourse }: CourseEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [course, setCourse] = useState<Course>({
    title: initialCourse?.title || "",
    description: initialCourse?.description || "",
    level: initialCourse?.level || "Beginner",
    duration: initialCourse?.duration || "",
    price: initialCourse?.price || 0,
    is_featured: initialCourse?.is_featured || false,
    image_url: initialCourse?.image_url || "",
  })

  const handleSave = async () => {
    if (!course.title.trim() || !course.description.trim()) {
      alert("Please fill in the title and description")
      return
    }

    setIsLoading(true)

    try {
      const courseData = {
        ...course,
        updated_at: new Date().toISOString(),
      }

      const url = initialCourse ? `/api/courses/${initialCourse.id}` : "/api/courses"
      const method = initialCourse ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      })

      if (response.ok) {
        router.push("/admin/courses")
      } else {
        const error = await response.json()
        alert(`Failed to save course: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving course:", error)
      alert("Failed to save course")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/courses">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{initialCourse ? "Edit Course" : "Create New Course"}</h1>
                <p className="text-muted-foreground">
                  {initialCourse ? "Update your course details" : "Create a new course offering"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {initialCourse ? "Update Course" : "Create Course"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={course.title}
                onChange={(e) => setCourse((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={course.description}
                onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your course..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={course.level}
                  onValueChange={(value) => setCourse((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={course.duration}
                  onChange={(e) => setCourse((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 8 weeks, 40 hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={course.price}
                  onChange={(e) => setCourse((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Course Image URL</Label>
                <Input
                  id="image_url"
                  value={course.image_url}
                  onChange={(e) => setCourse((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={course.is_featured}
                onCheckedChange={(checked) => setCourse((prev) => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="is_featured">Featured Course</Label>
              <p className="text-sm text-muted-foreground ml-2">Featured courses appear prominently on the homepage</p>
            </div>
          </CardContent>
        </Card>

        {course.image_url && (
          <Card>
            <CardHeader>
              <CardTitle>Course Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={course.image_url || "/placeholder.svg"}
                alt="Course preview"
                className="w-full max-w-md h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
