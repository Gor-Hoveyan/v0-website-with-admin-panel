import { createClient } from "@/lib/supabase/server"
import { ProjectManagement } from "@/components/admin/project-management"

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return <div>Error loading projects</div>
  }

  return <ProjectManagement initialProjects={projects || []} />
}
