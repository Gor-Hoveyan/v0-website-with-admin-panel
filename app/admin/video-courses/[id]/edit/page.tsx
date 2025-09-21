import { createClient } from "@/lib/supabase/server"
import { VideoCourseEditor } from "@/components/admin/video-course-editor"
import { notFound } from "next/navigation"

interface EditVideoCoursePageProps {
  params: Promise<{ id: string }>
}

export default async function EditVideoCoursePage({ params }: EditVideoCoursePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: videoCourse, error } = await supabase.from("video_courses").select("*").eq("id", id).single()

  if (error || !videoCourse) {
    notFound()
  }

  return <VideoCourseEditor initialVideoCourse={videoCourse} />
}
