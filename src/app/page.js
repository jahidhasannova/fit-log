import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="flex min-h-[80vh] items-center justify-center">
        <h1 className="text-4xl font-black uppercase text-white">
          FitLog
        </h1>
      </div>
    </main>
  );
}