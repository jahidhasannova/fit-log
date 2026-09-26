export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>

        <p className="text-lg font-black uppercase tracking-wider">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}

