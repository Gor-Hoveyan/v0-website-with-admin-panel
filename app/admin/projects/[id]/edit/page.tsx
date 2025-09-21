import { createClient } from "@/lib/supabase/server"
import { ProjectEditor } from "@/components/admin/project-editor"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error || !project) {
    notFound()
  }

  return <ProjectEditor initialProject={project} />
}
