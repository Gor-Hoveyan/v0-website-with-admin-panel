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
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Save, X, Plus } from "lucide-react"

interface Project {
  id?: string
  title: string
  description: string
  category: string
  status: string
  is_featured: boolean
  image_url?: string
  github_url?: string
  demo_url?: string
  technologies: string[]
}

interface ProjectEditorProps {
  initialProject?: Project
}

export function ProjectEditor({ initialProject }: ProjectEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newTech, setNewTech] = useState("")
  const [project, setProject] = useState<Project>({
    title: initialProject?.title || "",
    description: initialProject?.description || "",
    category: initialProject?.category || "Web Development",
    status: initialProject?.status || "Planning",
    is_featured: initialProject?.is_featured || false,
    image_url: initialProject?.image_url || "",
    github_url: initialProject?.github_url || "",
    demo_url: initialProject?.demo_url || "",
    technologies: initialProject?.technologies || [],
  })

  const handleSave = async () => {
    if (!project.title.trim() || !project.description.trim()) {
      alert("Please fill in the title and description")
      return
    }

    setIsLoading(true)

    try {
      const projectData = {
        ...project,
        updated_at: new Date().toISOString(),
      }

      const url = initialProject ? `/api/projects/${initialProject.id}` : "/api/projects"
      const method = initialProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        router.push("/admin/projects")
      } else {
        const error = await response.json()
        alert(`Failed to save project: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Failed to save project")
    } finally {
      setIsLoading(false)
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !project.technologies.includes(newTech.trim())) {
      setProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{initialProject ? "Edit Project" : "Create New Project"}</h1>
                <p className="text-muted-foreground">
                  {initialProject ? "Update your project details" : "Add a new project to your portfolio"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {initialProject ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={project.title}
                onChange={(e) => setProject((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={project.description}
                onChange={(e) => setProject((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={project.category}
                  onValueChange={(value) => setProject((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Desktop App">Desktop App</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={project.status}
                  onValueChange={(value) => setProject((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Project Image URL</Label>
              <Input
                id="image_url"
                value={project.image_url}
                onChange={(e) => setProject((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/project-screenshot.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  value={project.github_url}
                  onChange={(e) => setProject((prev) => ({ ...prev, github_url: e.target.value }))}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  value={project.demo_url}
                  onChange={(e) => setProject((prev) => ({ ...prev, demo_url: e.target.value }))}
                  placeholder="https://project-demo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology (e.g., React, Node.js)"
                  onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                />
                <Button type="button" onClick={addTechnology} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={project.is_featured}
                onCheckedChange={(checked) => setProject((prev) => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="is_featured">Featured Project</Label>
              <p className="text-sm text-muted-foreground ml-2">Featured projects appear prominently on the homepage</p>
            </div>
          </CardContent>
        </Card>

        {project.image_url && (
          <Card>
            <CardHeader>
              <CardTitle>Project Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={project.image_url || "/placeholder.svg"}
                alt="Project preview"
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
