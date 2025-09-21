import { createClient } from "@/lib/supabase/server"
import { BlogManagement } from "@/components/admin/blog-management"

export default async function AdminBlogPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return <div>Error loading blog posts</div>
  }

  return <BlogManagement initialPosts={posts || []} />
}
