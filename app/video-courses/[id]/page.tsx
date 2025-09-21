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
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Play,
  Download,
  CheckCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

interface VideoCoursePageProps {
  params: {
    id: string;
  };
}

export default async function VideoCoursePage({
  params,
}: VideoCoursePageProps) {
  const supabase = await createClient();
  const { data: course, error } = await supabase
    .from("video_courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !course) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/video-courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Video Courses
            </Link>
          </Button>
        </div>
      </section>

      {/* Video Course Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
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
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  {course.description}
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                {course.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                )}
              </div>

              {course.price && (
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-primary">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Start Watching
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resources
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {course.video_url ? (
                  <video
                    src={course.video_url}
                    poster={course.image_url || "/placeholder.svg"}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <img
                      src={course.image_url || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play className="h-8 w-8 text-primary fill-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Course Details */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Course */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  About This Video Course
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {course.description ||
                    "This comprehensive video course provides step-by-step instruction and hands-on learning experience."}
                </p>
              </div>

              {/* Course Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Course Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {course.duration || "Self-paced"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {course.level || "All Levels"}
                      </p>
                    </CardContent>
                  </Card>

                  {course.price && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">
                          {course.price === 0 ? "Free" : `$${course.price}`}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge
                        variant={course.is_featured ? "default" : "outline"}
                      >
                        {course.is_featured ? "Featured" : "Available"}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Includes */}
              <Card>
                <CardHeader>
                  <CardTitle>This Course Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>High-quality video content</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Mobile and tablet access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      • Stable internet connection
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Computer, tablet, or smartphone
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Basic computer skills
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>
                      {new Date(course.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated:</span>
                    <span>
                      {new Date(course.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
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
              Join thousands of students who have already enrolled in this video
              course and transformed their skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Watching{" "}
                {course.price && course.price > 0 && `- $${course.price}`}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Preview Course
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
