import { createClient } from "@/lib/supabase/server"
import { TalkEditor } from "@/components/admin/talk-editor"
import { notFound } from "next/navigation"

interface EditTalkPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTalkPage({ params }: EditTalkPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: talk, error } = await supabase.from("talks").select("*").eq("id", id).single()

  if (error || !talk) {
    notFound()
  }

  return <TalkEditor initialTalk={talk} />
}
