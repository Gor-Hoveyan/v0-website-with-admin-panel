import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BookOpen,
  Video,
  FileText,
  Calendar,
  FolderOpen,
  Building2,
  Users,
  BarChart3,
  Plus,
  Edit,
  Eye,
} from "lucide-react"

const adminSections = [
  {
    title: "Courses",
    description: "Manage course content, pricing, and enrollment",
    icon: BookOpen,
    href: "/admin/courses",
    stats: { total: 5, published: 5, draft: 0 },
    color: "text-blue-600",
  },
  {
    title: "Video Courses",
    description: "Manage video content and lesson structure",
    icon: Video,
    href: "/admin/video-courses",
    stats: { total: 4, published: 4, draft: 0 },
    color: "text-purple-600",
  },
  {
    title: "Blog Posts",
    description: "Create and manage blog articles",
    icon: FileText,
    href: "/admin/blog",
    stats: { total: 6, published: 6, draft: 2 },
    color: "text-green-600",
  },
  {
    title: "Talks & Events",
    description: "Manage speaking engagements and events",
    icon: Calendar,
    href: "/admin/talks-events",
    stats: { total: 15, upcoming: 2, past: 13 },
    color: "text-orange-600",
  },
  {
    title: "Projects",
    description: "Showcase and manage project portfolio",
    icon: FolderOpen,
    href: "/admin/projects",
    stats: { total: 6, active: 4, archived: 2 },
    color: "text-indigo-600",
  },
  {
    title: "Companies",
    description: "Manage partner organizations and relationships",
    icon: Building2,
    href: "/admin/companies",
    stats: { total: 15, active: 15, inactive: 0 },
    color: "text-red-600",
  },
]

const quickStats = [
  { label: "Total Students", value: "5,247", change: "+12%", icon: Users },
  { label: "Course Enrollments", value: "8,450", change: "+8%", icon: BookOpen },
  { label: "Blog Views", value: "45.2K", change: "+15%", icon: Eye },
  { label: "Event Attendees", value: "2,100", change: "+25%", icon: Calendar },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your educational platform content</p>
            </div>
            <Button asChild>
              <Link href="/">
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Content Management Sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Content Management</h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${section.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">{section.stats.total}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={section.href}>
                          <Edit className="h-4 w-4 mr-2" />
                          Manage
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`${section.href}/new`}>
                          <Plus className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New course enrollment</p>
                  <p className="text-sm text-muted-foreground">25 students enrolled in "Deep Learning" course</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Blog post published</p>
                  <p className="text-sm text-muted-foreground">"The Future of AI in Education" is now live</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>

              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Event registration opened</p>
                  <p className="text-sm text-muted-foreground">Tech Education Summit 2024 registration is now open</p>
                </div>
                <span className="text-sm text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
