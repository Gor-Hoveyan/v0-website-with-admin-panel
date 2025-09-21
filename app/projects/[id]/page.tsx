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
  ExternalLink,
  Github,
  Star,
  Calendar,
  Tag,
} from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </section>

      {/* Project Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {project.category && (
                    <Badge variant="outline">{project.category}</Badge>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {project.project_url && (
                  <Button size="lg" asChild className="flex-1">
                    <Link href={project.project_url} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </Link>
                  </Button>
                )}
                {project.github_url && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href={project.github_url} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              <img
                src={project.image_url || "/placeholder.svg"}
                alt={project.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Description */}
              <div>
                <h2 className="text-3xl font-bold mb-6">About This Project</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description ||
                    "This project demonstrates innovative solutions and best practices in modern development."}
                </p>
              </div>

              {/* Project Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Project Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {project.category || "General"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">Active</Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Last Updated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(
                        (tech: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Project Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.project_url && (
                    <Button asChild className="w-full" variant="outline">
                      <Link href={project.project_url} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button asChild className="w-full" variant="outline">
                      <Link href={project.github_url} target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Created:
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Updated:
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Technologies:
                    </span>
                    <span className="text-sm font-medium">
                      {project.technologies?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would typically fetch related projects from the database */}
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/projects/related-1">
                        AI Learning Platform
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive platform for AI education with hands-on
                      exercises.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Python
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        TensorFlow
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/projects/related-2">
                        Data Science Toolkit
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive toolkit for data scientists with automated
                      tools.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Python
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Pandas
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Matplotlib
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/projects/related-3">
                        ML Model Deployment
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Framework for deploying ML models to production.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Docker
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Kubernetes
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        FastAPI
                      </Badge>
                    </div>
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
              Interested in Collaborating?
            </h2>
            <p className="text-lg opacity-90 text-pretty">
              I'm always interested in collaborating on innovative projects that
              advance education and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
