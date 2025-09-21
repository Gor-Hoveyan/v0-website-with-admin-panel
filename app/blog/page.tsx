import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Education: Transforming How We Learn",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing educational experiences and creating personalized learning paths for students worldwide.",
    image: "/ai-artificial-intelligence-course.jpg",
    category: "AI & Education",
    author: "EduPlatform",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Education", "Technology"],
  },
  {
    id: 2,
    title: "Data Science Career Guide: From Beginner to Professional",
    excerpt:
      "A comprehensive roadmap for aspiring data scientists, covering essential skills, tools, and career progression strategies.",
    image: "/data-science-analytics-charts.jpg",
    category: "Career Guide",
    author: "EduPlatform",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["Data Science", "Career", "Skills"],
  },
  {
    id: 3,
    title: "Machine Learning Best Practices: Lessons from Industry",
    excerpt:
      "Key insights and best practices for implementing machine learning solutions in real-world business environments.",
    image: "/machine-learning-algorithms-neural-network.jpg",
    category: "Machine Learning",
    author: "EduPlatform",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["Machine Learning", "Best Practices", "Industry"],
  },
  {
    id: 4,
    title: "Deep Learning Breakthrough: Understanding Transformer Architecture",
    excerpt:
      "Deep dive into transformer models and their revolutionary impact on natural language processing and computer vision.",
    image: "/deep-learning-neural-networks.png",
    category: "Deep Learning",
    author: "EduPlatform",
    date: "2023-12-28",
    readTime: "15 min read",
    tags: ["Deep Learning", "Transformers", "NLP"],
  },
  {
    id: 5,
    title: "Python Programming Tips for Data Scientists",
    excerpt:
      "Essential Python techniques and libraries that every data scientist should master for efficient data analysis and modeling.",
    image: "/placeholder.svg?key=python-tips",
    category: "Programming",
    author: "EduPlatform",
    date: "2023-12-20",
    readTime: "6 min read",
    tags: ["Python", "Programming", "Data Science"],
  },
  {
    id: 6,
    title: "Building Your First Neural Network: A Step-by-Step Guide",
    excerpt:
      "Complete tutorial for beginners on creating and training your first neural network using popular frameworks.",
    image: "/placeholder.svg?key=neural-network-guide",
    category: "Tutorial",
    author: "EduPlatform",
    date: "2023-12-15",
    readTime: "20 min read",
    tags: ["Neural Networks", "Tutorial", "Beginner"],
  },
]

const categories = [
  "All",
  "AI & Education",
  "Career Guide",
  "Machine Learning",
  "Deep Learning",
  "Programming",
  "Tutorial",
]

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Insights & Knowledge Sharing</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Stay updated with the latest trends, tutorials, and insights in AI, machine learning, and technology
              education.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
          </div>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <Badge variant="secondary">{blogPosts[0].category}</Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-balance">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground text-pretty">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${blogPosts[0].id}`}>
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{post.excerpt}</CardDescription>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className="text-primary hover:underline font-medium">
                      Read more
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Stay Updated</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Subscribe to our newsletter and never miss the latest insights and tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
