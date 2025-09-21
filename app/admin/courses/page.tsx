import { createClient } from "@/lib/supabase/server"
import { CourseManagement } from "@/components/admin/course-management"

export default async function AdminCoursesPage() {
  const supabase = await createClient()

  const { data: courses, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
    return <div>Error loading courses</div>
  }

  return <CourseManagement initialCourses={courses || []} />
}
