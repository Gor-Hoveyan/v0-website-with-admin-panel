import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Users, DollarSign } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "AI4ALL",
    description: "Comprehensive introduction to artificial intelligence for everyone",
    level: "Beginner",
    duration: "8 weeks",
    price: "$299",
    students: 1200,
    status: "Published",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Data Science Basics",
    description: "Learn the fundamentals of data science and analytics",
    level: "Beginner",
    duration: "6 weeks",
    price: "$249",
    students: 950,
    status: "Published",
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    title: "Machine Learning",
    description: "Deep dive into machine learning algorithms and applications",
    level: "Intermediate",
    duration: "12 weeks",
    price: "$399",
    students: 800,
    status: "Published",
    lastUpdated: "2024-01-05",
  },
  {
    id: 4,
    title: "Deep Learning",
    description: "Advanced neural networks and deep learning techniques",
    level: "Advanced",
    duration: "16 weeks",
    price: "$499",
    students: 600,
    status: "Published",
    lastUpdated: "2023-12-28",
  },
  {
    id: 5,
    title: "Programming Python",
    description: "Master Python programming from basics to advanced",
    level: "Beginner",
    duration: "10 weeks",
    price: "$199",
    students: 1500,
    status: "Published",
    lastUpdated: "2023-12-20",
  },
]

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Archived: "bg-gray-100 text-gray-800",
}

export default function AdminCoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Courses</h1>
              <p className="text-muted-foreground">Create and manage your course offerings</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/courses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Course
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All Levels
                </Button>
                <Button variant="outline" size="sm">
                  Published
                </Button>
                <Button variant="outline" size="sm">
                  Sort by Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <Badge className={statusColors[course.status as keyof typeof statusColors]}>
                        {course.status}
                      </Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>

                    <p className="text-muted-foreground">{course.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{course.price}</span>
                      </div>
                      <span>Duration: {course.duration}</span>
                      <span>Updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/courses/${course.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/courses/${course.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,050</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.6M</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
