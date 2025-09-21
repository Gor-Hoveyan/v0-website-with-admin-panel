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
import { ArrowLeft, Save, Eye } from "lucide-react"

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  slug: string
  published: boolean
  image_url?: string
}

interface BlogEditorProps {
  initialPost?: BlogPost
}

export function BlogEditor({ initialPost }: BlogEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState<BlogPost>({
    title: initialPost?.title || "",
    excerpt: initialPost?.excerpt || "",
    content: initialPost?.content || "",
    slug: initialPost?.slug || "",
    published: initialPost?.published || false,
    image_url: initialPost?.image_url || "",
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setPost((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSave = async (publish = false) => {
    if (!post.title.trim() || !post.content.trim()) {
      alert("Please fill in the title and content")
      return
    }

    setIsLoading(true)

    try {
      const postData = {
        ...post,
        published: publish,
        slug: post.slug || generateSlug(post.title),
      }

      const url = initialPost ? `/api/blog/${initialPost.id}` : "/api/blog"
      const method = initialPost ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        router.push("/admin/blog")
      } else {
        const error = await response.json()
        alert(`Failed to save blog post: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("Failed to save blog post")
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
                <Link href="/admin/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{initialPost ? "Edit Blog Post" : "Create New Blog Post"}</h1>
                <p className="text-muted-foreground">
                  {initialPost ? "Update your blog post" : "Write and publish your blog post"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleSave(false)} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSave(true)} disabled={isLoading}>
                <Eye className="h-4 w-4 mr-2" />
                {post.published ? "Update & Publish" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog post title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={post.slug}
                onChange={(e) => setPost((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={post.excerpt}
                onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of your blog post..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Featured Image URL</Label>
              <Input
                id="image_url"
                value={post.image_url}
                onChange={(e) => setPost((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={post.published}
                onCheckedChange={(checked) => setPost((prev) => ({ ...prev, published: checked }))}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Blog Content</Label>
              <Textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog post content here..."
                rows={20}
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">You can use Markdown formatting in your content.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
