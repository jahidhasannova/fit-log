"use client";

import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [sortOpen, setSortOpen] = useState(false);

  const handleRemoveFromPlan = (id) => {
    removeFromPlan(id);
    toast.error("Removed from today's plan");
  };

  const handleRemoveFromSaved = (id) => {
    removeFromSaved(id);
    toast.error("Removed from saved");
  };

  const handleMarkAsDone = (id) => {
    removeFromPlan(id);
    toast.success("Workout marked as done");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setSortOpen(false);
  };

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration || 0) - Number(b.duration || 0);
    }

    if (sortBy === "calories") {
      return (
        Number(a.caloriesBurned || 0) -
        Number(b.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return Number(a.rating || 0) - Number(b.rating || 0);
    }

    return 0;
  });

  // Metrics change according to the selected tab.
  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={900}
        theme="dark"
      />

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-5xl font-black uppercase md:text-7xl">
              MY PLAN
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-3 rounded-2xl border border-white/10 bg-zinc-900">
            <div className="relative px-4 py-6 text-center sm:px-6">
              <p className="text-sm font-semibold text-white">
                Exercises
              </p>

              <p className="mt-2 text-3xl font-black text-lime-400">
                {totalExercises}
              </p>

              <span className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-white/20"></span>
            </div>

            <div className="relative px-4 py-6 text-center sm:px-6">
              <p className="text-sm font-semibold text-white">
                Minutes
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {totalMinutes}
              </p>

              <span className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-white/20"></span>
            </div>

            <div className="px-4 py-6 text-center sm:px-6">
              <p className="text-sm font-semibold text-white">
                Calories
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {totalCalories}
              </p>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-fit gap-2 rounded-xl border border-white/10 bg-zinc-900/50 p-2">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`rounded-lg px-5 py-3 text-sm font-black uppercase transition ${
                  activeTab === "plan"
                    ? "bg-lime-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`rounded-lg px-5 py-3 text-sm font-black uppercase transition ${
                  activeTab === "saved"
                    ? "bg-lime-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Saved
              </button>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-400">
                Sort by
              </p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex min-w-36 items-center justify-between gap-4 rounded-xl border border-white/30 bg-black px-4 py-3 text-sm font-semibold text-white transition hover:border-lime-400"
                >
                  <span>
                    {sortBy === "duration" && "Duration"}
                    {sortBy === "calories" && "Calories"}
                    {sortBy === "rating" && "Rating"}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-white/20 bg-black p-1 shadow-xl">
                    {[
                      ["duration", "Duration"],
                      ["calories", "Calories"],
                      ["rating", "Rating"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSortChange(value)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-zinc-800"
                      >
                        <span>{label}</span>

                        {sortBy === value && (
                          <span className="text-lime-400">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {sortedWorkouts.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-zinc-900 px-6 py-16 text-center">
              <h2 className="text-3xl font-black uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mx-auto mt-4 max-w-md text-gray-400">
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save a workout from the library to see it here later."}
              </p>

              <Link
                href="/#library"
                className="mt-7 inline-flex rounded-full bg-lime-400 px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-lime-300"
              >
                Go to workouts
              </Link>
            </div>
          )}

          {sortedWorkouts.length > 0 && (
            <div className="flex flex-col gap-4">
              {sortedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-black sm:h-40 sm:w-56">
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-1 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 lg:w-64">
                        <h2 className="text-xl font-black uppercase text-white">
                          {workout.name}
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-gray-500">
                          {workout.equipment}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                          <span className="flex items-center gap-2">
                            <Clock3
                              size={16}
                              className="text-lime-400"
                            />
                            {workout.duration} min
                          </span>

                          <span className="flex items-center gap-2">
                            <Flame
                              size={16}
                              className="text-lime-400"
                            />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="flex items-center gap-2">
                            <Star
                              size={16}
                              className="text-lime-400"
                            />
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <Link
                          href={`/workouts/${workout.id}`}
                          className="rounded-full border border-white/20 bg-black px-5 py-2.5 text-xs font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsDone(workout.id)
                            }
                            className="inline-flex items-center gap-1 rounded-full border border-lime-400/40 px-4 py-2.5 text-xs font-black uppercase text-lime-400 transition hover:bg-lime-400 hover:text-black"
                          >
                            <Check size={14} />
                            Mark as Done
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (activeTab === "plan") {
                              handleRemoveFromPlan(workout.id);
                            } else {
                              handleRemoveFromSaved(workout.id);
                            }
                          }}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black p-2.5 text-gray-400 transition hover:border-red-400 hover:text-red-400"
                          aria-label="Remove workout"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}