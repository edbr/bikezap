"use client";

import { useEffect, useState } from "react";

type RedditPost = {
  title: string;
  url: string;
  summary?: string;
  image?: string;
  date?: string;
};

export default function CyclingFeed() {
  const [posts, setPosts] = useState<RedditPost[]>([]);

  useEffect(() => {
    fetch("/api/reddit")
      .then((r) => r.json())
      .then((data: RedditPost[]) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  if (!posts.length) {
    return (
      <section className="max-w-2xl mx-auto p-8 text-center text-muted-foreground">
        Loading latest cycling posts...
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">
        🚴‍♂️ BikeZap — Cycling Pulse
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Auto-curated from Reddit via Zapier
      </p>

      <ul className="space-y-6">
        {posts.map((p, i) => (
          <li key={i} className="border-b border-border pb-4">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {p.title}
            </a>

            {p.summary && (
              <p className="text-sm text-muted-foreground mt-1">{p.summary}</p>
            )}

            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full rounded-lg border border-border mt-2 max-h-80 object-cover"
              />
            )}

            {p.date && (
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(p.date).toLocaleString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
