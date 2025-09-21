import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // Fetch all stats in parallel
    const [
      { data: courses },
      { data: videoCourses },
      { data: blogPosts },
      { data: talksEvents },
      { data: projects },
      { data: companies },
    ] = await Promise.all([
      supabase.from("courses").select("id, is_featured, price"),
      supabase.from("video_courses").select("id, is_featured, price"),
      supabase.from("blog_posts").select("id, published"),
      supabase.from("talks_events").select("id, event_date"),
      supabase.from("projects").select("id"),
      supabase.from("companies").select("id"),
    ]);

    // Calculate comprehensive stats
    const stats = {
      courses: {
        total: courses?.length || 0,
        featured: courses?.filter((c) => c.is_featured).length || 0,
        totalRevenue:
          courses?.reduce((sum, course) => sum + (course.price || 0), 0) || 0,
      },
      videoCourses: {
        total: videoCourses?.length || 0,
        featured: videoCourses?.filter((vc) => vc.is_featured).length || 0,
        totalRevenue:
          videoCourses?.reduce((sum, course) => sum + (course.price || 0), 0) ||
          0,
      },
      blogPosts: {
        total: blogPosts?.length || 0,
        published: blogPosts?.filter((bp) => bp.published).length || 0,
        drafts: blogPosts?.filter((bp) => !bp.published).length || 0,
      },
      talksEvents: {
        total: talksEvents?.length || 0,
        upcoming:
          talksEvents?.filter(
            (te) => te.event_date && new Date(te.event_date) > new Date()
          ).length || 0,
        past:
          talksEvents?.filter(
            (te) => !te.event_date || new Date(te.event_date) <= new Date()
          ).length || 0,
      },
      projects: {
        total: projects?.length || 0,
      },
      companies: {
        total: companies?.length || 0,
      },
      overview: {
        totalContent:
          (courses?.length || 0) +
          (videoCourses?.length || 0) +
          (blogPosts?.length || 0) +
          (talksEvents?.length || 0) +
          (projects?.length || 0),
        totalRevenue:
          (courses?.reduce((sum, course) => sum + (course.price || 0), 0) ||
            0) +
          (videoCourses?.reduce(
            (sum, course) => sum + (course.price || 0),
            0
          ) || 0),
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
