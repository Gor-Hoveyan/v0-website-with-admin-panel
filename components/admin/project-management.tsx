"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, ExternalLink, Github, Code } from "lucide-react"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  category: string
  status: string
  is_featured: boolean
  image_url?: string
  github_url?: string
  demo_url?: string
  technologies: string[]
  created_at: string
  updated_at: string
}

interface ProjectManagementProps {
  initialProjects: Project[]
}

export function ProjectManagement({ initialProjects }: ProjectManagementProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && project.is_featured) ||
      (filter === "status" && project.status.toLowerCase() === filter) ||
      (filter === "category" && project.category.toLowerCase() === filter)

    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProjects(projects.filter((project) => project.id !== id))
      } else {
        alert("Failed to delete project")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project")
    }
  }

  const featuredCount = projects.filter((project) => project.is_featured).length
  const completedCount = projects.filter((project) => project.status === "Completed").length
  const inProgressCount = projects.filter((project) => project.status === "In Progress").length

  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Planning: "bg-yellow-100 text-yellow-800",
    "On Hold": "bg-gray-100 text-gray-800",
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Projects</h1>
              <p className="text-muted-foreground">Showcase your development projects and portfolio</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
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
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All Projects
                </Button>
                <Button
                  variant={filter === "featured" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("featured")}
                >
                  Featured
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
                <Button
                  variant={filter === "in progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("in progress")}
                >
                  In Progress
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No projects found.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/projects/new">Add your first project</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      {/* Project Image */}
                      <div className="relative w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {project.image_url ? (
                          <img
                            src={project.image_url || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Code className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                          {project.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                          <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>

                        <p className="text-muted-foreground">{project.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:underline"
                            >
                              <Github className="h-4 w-4" />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          <span className="text-muted-foreground">
                            Created: {new Date(project.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
