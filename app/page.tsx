import CyclingFeed from "@/components/CyclingFeed";

export default function Home() {
  return (
    <main>
      {/* Your hero section or intro here */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to BikeZap</h1>
        <p className="text-muted-foreground">
          A live feed of cycling stories, curated from Reddit via Zapier + Supabase.
        </p>
      </section>

      {/* Cycling Feed */}
      <CyclingFeed />
    </main>
  );
}