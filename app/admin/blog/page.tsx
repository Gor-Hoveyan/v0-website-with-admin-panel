import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Calendar, MessageSquare } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Education: Transforming How We Learn",
    excerpt: "Exploring how artificial intelligence is revolutionizing educational experiences...",
    category: "AI & Education",
    status: "Published",
    publishDate: "2024-01-15",
    views: 2450,
    comments: 18,
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Data Science Career Guide: From Beginner to Professional",
    excerpt: "A comprehensive roadmap for aspiring data scientists...",
    category: "Career Guide",
    status: "Published",
    publishDate: "2024-01-10",
    views: 1890,
    comments: 12,
    readTime: "12 min",
  },
  {
    id: 3,
    title: "Machine Learning Best Practices: Lessons from Industry",
    excerpt: "Key insights and best practices for implementing ML solutions...",
    category: "Machine Learning",
    status: "Published",
    publishDate: "2024-01-05",
    views: 1650,
    comments: 9,
    readTime: "10 min",
  },
  {
    id: 4,
    title: "Understanding Neural Networks: A Beginner's Guide",
    excerpt: "Breaking down complex neural network concepts into digestible pieces...",
    category: "Tutorial",
    status: "Draft",
    publishDate: null,
    views: 0,
    comments: 0,
    readTime: "15 min",
  },
  {
    id: 5,
    title: "The Ethics of AI: Building Responsible Systems",
    excerpt: "Exploring the ethical considerations in AI development...",
    category: "AI Ethics",
    status: "Draft",
    publishDate: null,
    views: 0,
    comments: 0,
    readTime: "11 min",
  },
]

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Scheduled: "bg-blue-100 text-blue-800",
}

export default function AdminBlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
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

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search blog posts..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All Categories
                </Button>
                <Button variant="outline" size="sm">
                  Published
                </Button>
                <Button variant="outline" size="sm">
                  Sort by Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <Badge className={statusColors[post.status as keyof typeof statusColors]}>{post.status}</Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>

                    <p className="text-muted-foreground">{post.excerpt}</p>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      {post.publishDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} comments</span>
                      </div>
                      <span>{post.readTime} read</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {post.status === "Published" && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/blog/${post.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,990</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">39</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
