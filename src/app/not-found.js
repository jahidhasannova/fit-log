import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
      <div>
        <p className="text-sm font-black tracking-[0.3em] text-lime-400">
          FITLOG
        </p>

        <h1 className="mt-4 text-6xl font-black uppercase md:text-8xl">
          404
        </h1>

        <p className="mt-4 text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-lime-400 px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-lime-300"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}