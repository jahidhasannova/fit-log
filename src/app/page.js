import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />

      <div className="flex min-h-[80vh] items-center justify-center">
        <h1 className="text-4xl font-black uppercase text-white">
          FitLog
        </h1>
      </div>
    </main>
  );
}