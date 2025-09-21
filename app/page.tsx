import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Users, BookOpen, Award, Building2 } from "lucide-react"

const stats = [
  { label: "Students Trained", value: "5,000+", icon: Users },
  { label: "Courses Available", value: "25+", icon: BookOpen },
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Partner Companies", value: "15+", icon: Building2 },
]

const featuredCourses = [
  {
    id: 1,
    title: "AI4ALL",
    description:
      "Comprehensive introduction to artificial intelligence for everyone, covering fundamentals and practical applications.",
    image: "/ai-artificial-intelligence-course.jpg",
    level: "Beginner",
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "Data Science Basics",
    description:
      "Learn the fundamentals of data science, including statistics, data analysis, and visualization techniques.",
    image: "/data-science-analytics-charts.jpg",
    level: "Beginner",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Machine Learning",
    description:
      "Dive deep into machine learning algorithms, model training, and real-world implementation strategies.",
    image: "/machine-learning-algorithms-neural-network.jpg",
    level: "Intermediate",
    duration: "12 weeks",
  },
  {
    id: 4,
    title: "Deep Learning",
    description: "Advanced neural networks, deep learning architectures, and cutting-edge AI applications.",
    image: "/deep-learning-neural-networks.png",
    level: "Advanced",
    duration: "16 weeks",
  },
]

const partnerCompanies = [
  { name: "UFAR", category: "University", logo: "/ufar-university-logo.jpg" },
  { name: "NPUA", category: "University", logo: "/npua-university-logo.jpg" },
  { name: "ASUE", category: "University", logo: "/asue-university-logo.jpg" },
  { name: "GSU", category: "University", logo: "/gsu-university-logo.jpg" },
  { name: "ARDY Academy", category: "Training Center", logo: "/ardy-academy-logo.jpg" },
  { name: "Picsart Academy", category: "Training Center", logo: "/picsart-academy-logo.jpg" },
  { name: "Microsoft Academy", category: "Training Center", logo: "/microsoft-academy-logo.jpg" },
  { name: "Luseen Mobile", category: "Company", logo: "/luseen-mobile-company-logo.jpg" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Empowering the Next Generation of <span className="text-primary">Tech Leaders</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Join thousands of students who have transformed their careers through our comprehensive courses in AI,
                  Data Science, Machine Learning, and Programming.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/courses">
                    Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="/professional-educator-teaching-technology.jpg" alt="Professional educator" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Short Information/Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Bridging the Gap Between Education and Industry
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              With over a decade of experience in technology education, I've dedicated my career to making complex
              concepts accessible and practical. My courses combine theoretical foundations with hands-on projects,
              ensuring students are ready for real-world challenges.
            </p>
            <p className="text-lg text-muted-foreground text-pretty">
              From AI fundamentals to advanced machine learning, each program is designed with industry partnerships and
              practical applications in mind. Join a community of learners who are shaping the future of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses designed to accelerate your career in technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.level}</Badge>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{course.description}</CardDescription>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Trusted by Leading Organizations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partnering with universities, training centers, and companies to deliver world-class education
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {partnerCompanies.map((partner, index) => (
              <div key={index} className="group text-center space-y-2">
                <div className="bg-card rounded-lg p-4 group-hover:shadow-md transition-shadow">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">{partner.category}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/companies">View All Partners</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg opacity-90 text-pretty">
              Join thousands of students who have transformed their careers. Get started with our comprehensive courses
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
