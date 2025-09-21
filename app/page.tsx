import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Award, Lightbulb } from "lucide-react";

const stats = [
  { label: "Students Mentored", value: "5,000+", icon: Users },
  { label: "Courses Authored", value: "25+", icon: BookOpen },
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Personal Projects", value: "15+", icon: Lightbulb },
];

export default async function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Sharing Knowledge & Inspiring{" "}
                  <span className="text-primary">Tech Enthusiasts</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  I help learners gain hands-on skills in AI, Data Science,
                  Machine Learning, and programming through personalized
                  guidance and real-world projects.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/about">
                    Learn More About Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">My Work</Link>
                </Button>
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

      {/* Quick Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Short Information / Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Making Technology Accessible
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Over a decade of experience has taught me how to make complex
              concepts understandable and actionable. I design courses,
              tutorials, and projects that allow learners to immediately apply
              what they learn.
            </p>
            <p className="text-lg text-muted-foreground text-pretty">
              From foundational programming to advanced AI techniques, my goal
              is to guide others to build real-world skills and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses / Projects */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Highlighted Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selected personal projects and courses I’ve developed to help
              learners advance their skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Replace with actual project data or GitHub repo cards */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">AI Chatbot Project</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Developed an AI chatbot using GPT technology to answer student
                  queries and provide interactive learning experiences.
                </CardDescription>
                <Button asChild className="w-full">
                  <Link href="https://github.com/yourusername/aichatbot">
                    View Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Want to Collaborate or Learn Together?
            </h2>
            <p className="text-lg opacity-90 text-pretty">
              Reach out to me to discuss projects, mentorship, or personalized
              learning sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
