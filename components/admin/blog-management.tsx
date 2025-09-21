"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
  image_url?: string
}

interface BlogManagementProps {
  initialPosts: BlogPost[]
}

export function BlogManagement({ initialPosts }: BlogManagementProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filter === "all" || (filter === "published" && post.published) || (filter === "draft" && !post.published)
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      } else {
        alert("Failed to delete blog post")
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      alert("Failed to delete blog post")
    }
  }

  const publishedCount = posts.filter((post) => post.published).length
  const draftCount = posts.filter((post) => !post.published).length

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Blog</h1>
              <p className="text-muted-foreground">Create and manage your blog content</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
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
                  placeholder="Search blog posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All Posts
                </Button>
                <Button
                  variant={filter === "published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("published")}
                >
                  Published
                </Button>
                <Button
                  variant={filter === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("draft")}
                >
                  Drafts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No blog posts found.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/blog/new">Create your first blog post</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <Badge
                          className={post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground">{post.excerpt}</p>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        {post.updated_at !== post.created_at && (
                          <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      {post.published && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.created_at)
                    const now = new Date()
                    return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
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
