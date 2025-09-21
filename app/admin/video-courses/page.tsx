import { createClient } from "@/lib/supabase/server"
import { VideoCourseManagement } from "@/components/admin/video-course-management"

export default async function AdminVideoCoursesPage() {
  const supabase = await createClient()

  const { data: videoCourses, error } = await supabase
    .from("video_courses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching video courses:", error)
    return <div>Error loading video courses</div>
  }

  return <VideoCourseManagement initialVideoCourses={videoCourses || []} />
}
