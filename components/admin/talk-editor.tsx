"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft, Save, Calendar, MapPin } from "lucide-react"

interface Talk {
  id?: string
  title: string
  description: string
  date: string
  location: string
  event_name?: string
  is_featured: boolean
  image_url?: string
  slides_url?: string
  video_url?: string
}

interface TalkEditorProps {
  initialTalk?: Talk
}

export function TalkEditor({ initialTalk }: TalkEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [talk, setTalk] = useState<Talk>({
    title: initialTalk?.title || "",
    description: initialTalk?.description || "",
    date: initialTalk?.date || "",
    location: initialTalk?.location || "",
    event_name: initialTalk?.event_name || "",
    is_featured: initialTalk?.is_featured || false,
    image_url: initialTalk?.image_url || "",
    slides_url: initialTalk?.slides_url || "",
    video_url: initialTalk?.video_url || "",
  })

  const handleSave = async () => {
    if (!talk.title.trim() || !talk.description.trim() || !talk.date || !talk.location.trim()) {
      alert("Please fill in the title, description, date, and location")
      return
    }

    setIsLoading(true)

    try {
      const talkData = {
        ...talk,
        updated_at: new Date().toISOString(),
      }

      const url = initialTalk ? `/api/talks/${initialTalk.id}` : "/api/talks"
      const method = initialTalk ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(talkData),
      })

      if (response.ok) {
        router.push("/admin/talks")
      } else {
        const error = await response.json()
        alert(`Failed to save talk: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving talk:", error)
      alert("Failed to save talk")
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
                <Link href="/admin/talks">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Talks
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{initialTalk ? "Edit Talk" : "Create New Talk"}</h1>
                <p className="text-muted-foreground">
                  {initialTalk ? "Update your talk details" : "Add a new speaking engagement"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {initialTalk ? "Update Talk" : "Create Talk"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Talk Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Talk Title</Label>
              <Input
                id="title"
                value={talk.title}
                onChange={(e) => setTalk((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter talk title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={talk.description}
                onChange={(e) => setTalk((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your talk..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="datetime-local"
                    value={talk.date}
                    onChange={(e) => setTalk((prev) => ({ ...prev, date: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={talk.location}
                    onChange={(e) => setTalk((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., San Francisco, CA"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_name">Event Name (Optional)</Label>
              <Input
                id="event_name"
                value={talk.event_name}
                onChange={(e) => setTalk((prev) => ({ ...prev, event_name: e.target.value }))}
                placeholder="e.g., TechConf 2024, AI Summit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Event Image URL</Label>
              <Input
                id="image_url"
                value={talk.image_url}
                onChange={(e) => setTalk((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/event-image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="slides_url">Slides URL (Optional)</Label>
                <Input
                  id="slides_url"
                  value={talk.slides_url}
                  onChange={(e) => setTalk((prev) => ({ ...prev, slides_url: e.target.value }))}
                  placeholder="https://slides.com/presentation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL (Optional)</Label>
                <Input
                  id="video_url"
                  value={talk.video_url}
                  onChange={(e) => setTalk((prev) => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={talk.is_featured}
                onCheckedChange={(checked) => setTalk((prev) => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="is_featured">Featured Talk</Label>
              <p className="text-sm text-muted-foreground ml-2">Featured talks appear prominently on the homepage</p>
            </div>
          </CardContent>
        </Card>

        {talk.image_url && (
          <Card>
            <CardHeader>
              <CardTitle>Event Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={talk.image_url || "/placeholder.svg"}
                alt="Event preview"
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
