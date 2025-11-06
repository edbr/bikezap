"use client";

import { useEffect, useState } from "react";

export default function CyclingFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/reddit")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">🚴‍♂️ BikeZap — Cycling Pulse</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Auto-curated from Reddit via Zapier
      </p>

      <ul className="space-y-6">
        {posts.map((p, i) => (
          <li key={i} className="border-b border-border pb-4">
            <a href={p.url} target="_blank" className="font-medium hover:underline">
              {p.title}
            </a>
            <p className="text-sm text-muted-foreground">{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
