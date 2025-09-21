import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Github, Star } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "AI Learning Platform",
    description:
      "Open-source platform for interactive AI education with hands-on exercises, real-time feedback, and progress tracking.",
    image: "/ai-artificial-intelligence-course.jpg",
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL"],
    category: "Education Platform",
    status: "Active",
    github: "https://github.com/example/ai-learning-platform",
    demo: "https://ai-learning-demo.com",
    stars: 1200,
  },
  {
    id: 2,
    title: "Data Science Toolkit",
    description:
      "Comprehensive toolkit for data scientists with automated data preprocessing, visualization tools, and model evaluation metrics.",
    image: "/data-science-analytics-charts.jpg",
    technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: "Developer Tools",
    status: "Active",
    github: "https://github.com/example/data-science-toolkit",
    demo: "https://ds-toolkit-demo.com",
    stars: 850,
  },
  {
    id: 3,
    title: "ML Model Deployment Framework",
    description:
      "Simplified framework for deploying machine learning models to production with monitoring, scaling, and version control.",
    image: "/machine-learning-algorithms-neural-network.jpg",
    technologies: ["Docker", "Kubernetes", "FastAPI", "MLflow"],
    category: "MLOps",
    status: "Beta",
    github: "https://github.com/example/ml-deployment-framework",
    demo: "https://ml-deploy-demo.com",
    stars: 650,
  },
  {
    id: 4,
    title: "Neural Network Visualizer",
    description:
      "Interactive tool for visualizing neural network architectures, training processes, and decision boundaries in real-time.",
    image: "/deep-learning-neural-networks.png",
    technologies: ["JavaScript", "D3.js", "WebGL", "Python"],
    category: "Visualization",
    status: "Active",
    github: "https://github.com/example/neural-network-visualizer",
    demo: "https://nn-visualizer-demo.com",
    stars: 2100,
  },
  {
    id: 5,
    title: "Course Management System",
    description:
      "Modern LMS built for technical courses with code execution, automated grading, and collaborative learning features.",
    image: "/placeholder.svg?key=lms",
    technologies: ["Next.js", "Node.js", "MongoDB", "Docker"],
    category: "Education Platform",
    status: "Active",
    github: "https://github.com/example/course-management-system",
    demo: "https://cms-demo.com",
    stars: 450,
  },
  {
    id: 6,
    title: "AI Ethics Assessment Tool",
    description:
      "Framework for evaluating AI systems against ethical guidelines with automated testing and reporting capabilities.",
    image: "/placeholder.svg?key=ethics",
    technologies: ["Python", "Flask", "React", "PostgreSQL"],
    category: "AI Ethics",
    status: "Research",
    github: "https://github.com/example/ai-ethics-tool",
    demo: "https://ethics-tool-demo.com",
    stars: 320,
  },
]

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Beta: "bg-yellow-100 text-yellow-800",
  Research: "bg-blue-100 text-blue-800",
}

const categories = ["All", "Education Platform", "Developer Tools", "MLOps", "Visualization", "AI Ethics"]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Open Source Projects & Research</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Explore my contributions to the open source community and research projects in AI, education technology,
              and developer tools.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{project.stars}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{project.description}</CardDescription>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <Link href={project.github} target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Stats */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Open Source Contributions</h2>
            <p className="text-lg text-muted-foreground">
              Contributing to the community through code, documentation, and mentorship
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5.2k</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1.8k</div>
              <div className="text-sm text-muted-foreground">Forks</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Want to Collaborate?</h2>
            <p className="text-lg opacity-90 text-pretty">
              I'm always interested in collaborating on innovative projects that advance education and technology.
            </p>
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
