import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📩 Incoming body:", body);

    const { data, error } = await supabase
      .from("posts")
      .upsert([
        {
          title: body.title,
          url: body.url,
          summary: body.summary,
          image: body.image,
          date: new Date().toISOString(),
        },
      ],
      { onConflict: "url" }
      )
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("✅ Supabase insert success:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 POST handler error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
