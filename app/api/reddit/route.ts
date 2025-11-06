import { NextResponse } from "next/server";

let cache: any[] = []; // simple in-memory cache for now

export async function POST(req: Request) {
  const body = await req.json();
  const { title, url, summary, image } = body;

  cache.unshift({ title, url, summary, image, date: new Date().toISOString() });
  if (cache.length > 20) cache.pop();

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(cache);
}
