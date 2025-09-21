import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { operation, table, ids, data } = await request.json();

    if (!operation || !table || !ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    let result;

    switch (operation) {
      case "delete":
        result = await supabase.from(table).delete().in("id", ids);
        break;
      case "update":
        if (!data) {
          return NextResponse.json(
            { error: "Data required for update operation" },
            { status: 400 }
          );
        }
        result = await supabase.from(table).update(data).in("id", ids);
        break;
      case "publish":
        result = await supabase
          .from(table)
          .update({ published: true })
          .in("id", ids);
        break;
      case "unpublish":
        result = await supabase
          .from(table)
          .update({ published: false })
          .in("id", ids);
        break;
      case "feature":
        result = await supabase
          .from(table)
          .update({ is_featured: true })
          .in("id", ids);
        break;
      case "unfeature":
        result = await supabase
          .from(table)
          .update({ is_featured: false })
          .in("id", ids);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid operation" },
          { status: 400 }
        );
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      affectedRows: result.count || ids.length,
      operation,
      table,
    });
  } catch (error) {
    console.error("Bulk operation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
