import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, url, summary, image } = body;

    if (!title || !url) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Avoid duplicates
    const { error: insertError } = await supabase
      .from("posts")
      .upsert([{ title, url, summary, image }], { onConflict: "url" });

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}
