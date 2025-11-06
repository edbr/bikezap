import CyclingFeed from "@/components/CyclingFeed";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <div className="flex-1 pb-24"> {/* give space for footer */}
      <CyclingFeed />
      </div>
      <Footer />
    </main>
  );
}