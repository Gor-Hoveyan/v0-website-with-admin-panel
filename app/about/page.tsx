import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Users, Target, Heart, Lightbulb } from "lucide-react"

const achievements = [
  {
    icon: Users,
    title: "5,000+ Students Trained",
    description: "Successfully mentored thousands of students across various technology disciplines",
  },
  {
    icon: BookOpen,
    title: "25+ Courses Developed",
    description: "Created comprehensive curriculum covering AI, ML, Data Science, and Programming",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Received multiple awards for excellence in technology education and innovation",
  },
]

const mission = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize access to quality technology education and bridge the gap between academic learning and industry requirements.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in inclusive education, practical learning, and empowering every student to reach their full potential in technology.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "To create a world where anyone, regardless of background, can master technology skills and contribute to innovation.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  About Me
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                  Passionate Educator & Technology Innovator
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  With over a decade of experience in technology education, I've dedicated my career to making complex
                  concepts accessible and preparing students for the future of work.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/professional-educator-teaching-technology.jpg"
                alt="Professional educator"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">My Journey</h2>
              <p className="text-lg text-muted-foreground">From curious student to industry leader and educator</p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                My journey in technology began over fifteen years ago as a curious computer science student fascinated
                by the potential of artificial intelligence and data science. What started as academic interest quickly
                evolved into a passion for not just understanding these technologies, but making them accessible to
                others.
              </p>

              <p>
                After completing my advanced degrees in Computer Science and Machine Learning, I spent several years in
                industry, working with leading tech companies to develop cutting-edge AI solutions. However, I soon
                realized that my true calling was in education – helping others discover and master these transformative
                technologies.
              </p>

              <p>
                Over the past decade, I've had the privilege of teaching at prestigious universities, developing
                curriculum for major training centers, and partnering with industry leaders to create practical,
                real-world learning experiences. My approach combines rigorous academic foundations with hands-on,
                project-based learning that prepares students for immediate impact in their careers.
              </p>

              <p>
                Today, I continue to innovate in education technology, developing new teaching methodologies and
                creating courses that bridge the gap between theoretical knowledge and practical application. My goal
                remains the same: to empower every student with the skills and confidence they need to thrive in our
                technology-driven world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Key Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milestones that reflect our commitment to excellence in education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <CardTitle>{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{achievement.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission, Values, Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mission.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="space-y-4">
                  <Icon className="h-10 w-10 text-primary" />
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-pretty">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Learn Together?</h2>
            <p className="text-lg opacity-90 text-pretty">
              Join me on this exciting journey of discovery and growth in technology education.
            </p>
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
