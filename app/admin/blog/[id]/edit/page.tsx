import { createClient } from "@/lib/supabase/server"
import { BlogEditor } from "@/components/admin/blog-editor"
import { notFound } from "next/navigation"

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error || !post) {
    notFound()
  }

  return <BlogEditor initialPost={post} />
}
