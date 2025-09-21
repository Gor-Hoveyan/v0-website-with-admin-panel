import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock, Users, Star, ArrowRight } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "AI4ALL",
    description:
      "Comprehensive introduction to artificial intelligence for everyone, covering fundamentals, ethics, and practical applications in various industries.",
    image: "/ai-artificial-intelligence-course.jpg",
    level: "Beginner",
    duration: "8 weeks",
    students: "1,200+",
    rating: 4.9,
    price: "$299",
    topics: ["AI Fundamentals", "Machine Learning Basics", "Ethics in AI", "Practical Applications"],
  },
  {
    id: 2,
    title: "Data Science Basics",
    description:
      "Learn the fundamentals of data science, including statistics, data analysis, visualization techniques, and real-world problem solving.",
    image: "/data-science-analytics-charts.jpg",
    level: "Beginner",
    duration: "6 weeks",
    students: "950+",
    rating: 4.8,
    price: "$249",
    topics: ["Statistics", "Data Analysis", "Visualization", "Python/R"],
  },
  {
    id: 3,
    title: "Machine Learning",
    description:
      "Dive deep into machine learning algorithms, model training, evaluation, and real-world implementation strategies for various domains.",
    image: "/machine-learning-algorithms-neural-network.jpg",
    level: "Intermediate",
    duration: "12 weeks",
    students: "800+",
    rating: 4.9,
    price: "$399",
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
  },
  {
    id: 4,
    title: "Deep Learning",
    description:
      "Advanced neural networks, deep learning architectures, and cutting-edge AI applications including computer vision and NLP.",
    image: "/deep-learning-neural-networks.png",
    level: "Advanced",
    duration: "16 weeks",
    students: "600+",
    rating: 4.9,
    price: "$499",
    topics: ["Neural Networks", "CNN", "RNN", "Transformers"],
  },
  {
    id: 5,
    title: "Programming Python",
    description:
      "Master Python programming from basics to advanced concepts, including web development, data manipulation, and automation.",
    image: "/placeholder.svg?key=python",
    level: "Beginner",
    duration: "10 weeks",
    students: "1,500+",
    rating: 4.7,
    price: "$199",
    topics: ["Python Basics", "OOP", "Web Development", "Data Manipulation"],
  },
]

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export default function CoursesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Transform Your Career with Our Courses</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Comprehensive, hands-on courses designed to take you from beginner to professional in the most in-demand
              technology skills.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={levelColors[course.level as keyof typeof levelColors]}>{course.level}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
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

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What you'll learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Not Sure Which Course is Right for You?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Get personalized course recommendations based on your goals and experience level.
            </p>
            <Button size="lg">Get Course Recommendations</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
