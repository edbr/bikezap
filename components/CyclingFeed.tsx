"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type RedditPost = {
  title: string;
  url: string;
  summary?: string;
  image?: string;
  date?: string;
  source?: string;
};

export default function CyclingFeed() {
  const [posts, setPosts] = useState<RedditPost[]>([]);

  useEffect(() => {
    fetch("/api/reddit")
      .then((r) => r.json())
      .then((data: RedditPost[]) => setPosts(data.reverse())) // newest first
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-3 tracking-tight">
        🚴‍♂️ BikeZap — Cycling Pulse
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Auto-curated cycling stories from Reddit, via Zapier + Supabase
      </p>

      <div className="grid gap-6">
        {posts.map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="group block border border-border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {p.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                <span
                  className={`px-2 py-0.5 text-xs rounded-full border ${
                    p.source?.includes("commuting")
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {p.source ?? "r/cycling"}
                </span>

                {p.date && (
                  <time>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>

              <h2 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                {p.title}
              </h2>

              {p.summary && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {p.summary}
                </p>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
