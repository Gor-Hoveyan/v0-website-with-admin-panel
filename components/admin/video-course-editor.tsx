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
import { ArrowLeft, Save, Play } from "lucide-react"

interface VideoCourse {
  id?: string
  title: string
  description: string
  level: string
  duration: string
  price: number
  is_featured: boolean
  video_url?: string
  image_url?: string
}

interface VideoCourseEditorProps {
  initialVideoCourse?: VideoCourse
}

export function VideoCourseEditor({ initialVideoCourse }: VideoCourseEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [videoCourse, setVideoCourse] = useState<VideoCourse>({
    title: initialVideoCourse?.title || "",
    description: initialVideoCourse?.description || "",
    level: initialVideoCourse?.level || "Beginner",
    duration: initialVideoCourse?.duration || "",
    price: initialVideoCourse?.price || 0,
    is_featured: initialVideoCourse?.is_featured || false,
    video_url: initialVideoCourse?.video_url || "",
    image_url: initialVideoCourse?.image_url || "",
  })

  const handleSave = async () => {
    if (!videoCourse.title.trim() || !videoCourse.description.trim()) {
      alert("Please fill in the title and description")
      return
    }

    setIsLoading(true)

    try {
      const videoCourseData = {
        ...videoCourse,
        updated_at: new Date().toISOString(),
      }

      const url = initialVideoCourse ? `/api/video-courses/${initialVideoCourse.id}` : "/api/video-courses"
      const method = initialVideoCourse ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoCourseData),
      })

      if (response.ok) {
        router.push("/admin/video-courses")
      } else {
        const error = await response.json()
        alert(`Failed to save video course: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving video course:", error)
      alert("Failed to save video course")
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
                <Link href="/admin/video-courses">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Video Courses
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  {initialVideoCourse ? "Edit Video Course" : "Create New Video Course"}
                </h1>
                <p className="text-muted-foreground">
                  {initialVideoCourse ? "Update your video course details" : "Create a new video course offering"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {initialVideoCourse ? "Update Video Course" : "Create Video Course"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={videoCourse.title}
                onChange={(e) => setVideoCourse((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter video course title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={videoCourse.description}
                onChange={(e) => setVideoCourse((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your video course..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={videoCourse.level}
                  onValueChange={(value) => setVideoCourse((prev) => ({ ...prev, level: value }))}
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
                  value={videoCourse.duration}
                  onChange={(e) => setVideoCourse((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 2 hours, 45 minutes"
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
                  value={videoCourse.price}
                  onChange={(e) =>
                    setVideoCourse((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL</Label>
                <Input
                  id="video_url"
                  value={videoCourse.video_url}
                  onChange={(e) => setVideoCourse((prev) => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=... or video file URL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Thumbnail Image URL</Label>
              <Input
                id="image_url"
                value={videoCourse.image_url}
                onChange={(e) => setVideoCourse((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={videoCourse.is_featured}
                onCheckedChange={(checked) => setVideoCourse((prev) => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="is_featured">Featured Video Course</Label>
              <p className="text-sm text-muted-foreground ml-2">
                Featured video courses appear prominently on the homepage
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Video Preview */}
        {(videoCourse.video_url || videoCourse.image_url) && (
          <Card>
            <CardHeader>
              <CardTitle>Video Course Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videoCourse.image_url && (
                  <div>
                    <Label>Thumbnail Preview</Label>
                    <div className="relative w-full max-w-md h-48 bg-muted rounded-lg overflow-hidden mt-2">
                      <img
                        src={videoCourse.image_url || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {videoCourse.video_url && (
                  <div>
                    <Label>Video URL</Label>
                    <p className="text-sm text-muted-foreground mt-1">Video URL: {videoCourse.video_url}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
