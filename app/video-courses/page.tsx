import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Play, Clock, Users, Star } from "lucide-react"

const videoCourses = [
  {
    id: 1,
    title: "AI Fundamentals Video Series",
    description:
      "Complete video course covering artificial intelligence from ground up with practical examples and interactive exercises.",
    thumbnail: "/ai-artificial-intelligence-course.jpg",
    duration: "12 hours",
    lessons: 24,
    students: "2,100+",
    rating: 4.9,
    level: "Beginner",
    price: "Free",
  },
  {
    id: 2,
    title: "Python for Data Science",
    description:
      "Comprehensive video tutorial series teaching Python programming specifically for data science applications.",
    thumbnail: "/data-science-analytics-charts.jpg",
    duration: "18 hours",
    lessons: 36,
    students: "1,800+",
    rating: 4.8,
    level: "Beginner",
    price: "$99",
  },
  {
    id: 3,
    title: "Advanced Machine Learning",
    description:
      "Deep dive into advanced ML algorithms with video explanations, code walkthroughs, and real-world projects.",
    thumbnail: "/machine-learning-algorithms-neural-network.jpg",
    duration: "25 hours",
    lessons: 45,
    students: "1,200+",
    rating: 4.9,
    level: "Advanced",
    price: "$199",
  },
  {
    id: 4,
    title: "Neural Networks Masterclass",
    description: "Complete video course on neural networks and deep learning with hands-on implementation tutorials.",
    thumbnail: "/deep-learning-neural-networks.png",
    duration: "30 hours",
    lessons: 52,
    students: "900+",
    rating: 4.9,
    level: "Advanced",
    price: "$249",
  },
]

export default function VideoCoursesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Learn at Your Own Pace with Video Courses</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              High-quality video tutorials and courses that you can watch anytime, anywhere. Perfect for self-paced
              learning.
            </p>
          </div>
        </div>
      </section>

      {/* Video Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-black/70 text-white">{course.lessons} Lessons</Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{course.description}</CardDescription>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                    <Button asChild>
                      <Link href={`/video-courses/${course.id}`}>Watch Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Our Video Courses?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">High-Quality Content</h3>
              <p className="text-muted-foreground">
                Professional video production with clear explanations and practical examples.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Learn at Your Pace</h3>
              <p className="text-muted-foreground">
                Access courses 24/7 and learn at your own speed with lifetime access.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Community Support</h3>
              <p className="text-muted-foreground">Join our community of learners and get help when you need it.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
