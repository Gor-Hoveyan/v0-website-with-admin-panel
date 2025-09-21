import { createClient } from "@/lib/supabase/server"
import { CourseEditor } from "@/components/admin/course-editor"
import { notFound } from "next/navigation"

interface EditCoursePageProps {
  params: Promise<{ id: string }>
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: course, error } = await supabase.from("courses").select("*").eq("id", id).single()

  if (error || !course) {
    notFound()
  }

  return <CourseEditor initialCourse={course} />
}
