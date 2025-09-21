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
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">
              Transform Your Career with Our Courses
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Comprehensive, hands-on courses designed to take you from beginner
              to professional in the most in-demand technology skills.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses?.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image_url || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={
                        levelColors[course.level as keyof typeof levelColors] ||
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {course.level || "All Levels"}
                    </Badge>
                    {course.is_featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration || "Self-paced"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-primary">
                      {course.price ? `$${course.price}` : "Free"}
                    </div>
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) || []}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Choose Our Courses?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our courses are designed with industry best practices and
              real-world applications in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of real-world
                experience and proven track records.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Study at your own pace with lifetime access to course materials
                and regular updates.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Hands-on Projects</h3>
              <p className="text-muted-foreground">
                Apply what you learn through practical projects and build a
                portfolio that showcases your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Ready to Start Learning?
            </h2>
            <p className="text-lg opacity-90 text-pretty">
              Join thousands of students who have already transformed their
              careers with our comprehensive courses.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
