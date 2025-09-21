import { createClient } from "@/lib/supabase/server";
import { TalkManagement } from "@/components/admin/talk-management";

export default async function AdminTalksPage() {
  const supabase = await createClient();

  const { data: talks, error } = await supabase
    .from("talks_events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    console.error("Error fetching talks:", error);
    return <div>Error loading talks</div>;
  }

  return <TalkManagement initialTalks={talks || []} />;
}
