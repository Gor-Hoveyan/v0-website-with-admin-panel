import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "all";

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const searchTerm = `%${query}%`;
    const results: any[] = [];

    // Search across different tables based on type
    const searchPromises = [];

    if (type === "all" || type === "courses") {
      searchPromises.push(
        supabase
          .from("courses")
          .select("id, title, description, created_at")
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5)
          .then(
            ({ data }) =>
              data?.map((item) => ({ ...item, type: "course" })) || []
          )
      );
    }

    if (type === "all" || type === "blog") {
      searchPromises.push(
        supabase
          .from("blog_posts")
          .select("id, title, excerpt, created_at")
          .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
          .limit(5)
          .then(
            ({ data }) => data?.map((item) => ({ ...item, type: "blog" })) || []
          )
      );
    }

    if (type === "all" || type === "projects") {
      searchPromises.push(
        supabase
          .from("projects")
          .select("id, title, description, created_at")
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5)
          .then(
            ({ data }) =>
              data?.map((item) => ({ ...item, type: "project" })) || []
          )
      );
    }

    if (type === "all" || type === "talks") {
      searchPromises.push(
        supabase
          .from("talks_events")
          .select("id, title, description, event_date")
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5)
          .then(
            ({ data }) => data?.map((item) => ({ ...item, type: "talk" })) || []
          )
      );
    }

    if (type === "all" || type === "companies") {
      searchPromises.push(
        supabase
          .from("companies")
          .select("id, name, description, created_at")
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5)
          .then(
            ({ data }) =>
              data?.map((item) => ({ ...item, type: "company" })) || []
          )
      );
    }

    const searchResults = await Promise.all(searchPromises);
    const allResults = searchResults.flat();

    // Sort by relevance (exact title matches first, then description matches)
    const sortedResults = allResults.sort((a, b) => {
      const aTitleMatch = a.title?.toLowerCase().includes(query.toLowerCase());
      const bTitleMatch = b.title?.toLowerCase().includes(query.toLowerCase());

      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    return NextResponse.json({
      results: sortedResults.slice(0, 20), // Limit total results
      query,
      type,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
