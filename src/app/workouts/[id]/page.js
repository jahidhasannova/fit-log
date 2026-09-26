"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ArrowLeft,
  Bookmark,
  CalendarPlus,
  Clock3,
  Flame,
  Star,
} from "lucide-react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function WorkoutDetails() {
  const { id } = useParams();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error(error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>

            <p className="text-lg font-bold uppercase">
              Loading workout...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-black uppercase text-white">
            Workout Not Found
          </h1>

          <p className="mt-4 max-w-md text-gray-400">
            The workout you are looking for does not exist or could not be
            loaded.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-lime-300"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToPlan = () => {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    if (existingPlan.length >= 5) {
      toast.info("Today's plan is full");
      return;
    }

    if (existingPlan.some((item) => item.id === workout.id)) {
      toast.info("Workout is already in today's plan");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

    window.dispatchEvent(new Event("fitlog-updated"));

    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    if (existingSaved.some((item) => item.id === workout.id)) {
      toast.info("Workout is already saved");
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));

    window.dispatchEvent(new Event("fitlog-updated"));

    toast.success("Saved for later");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={900}
        theme="dark"
      />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-gray-400 transition hover:text-lime-400"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-zinc-900">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full min-h-[450px] w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                {workout.name}
              </h1>

              <p className="mt-6 leading-7 text-gray-400">
                {workout.description ||
                  "A focused workout designed to build strength, improve performance, and help you train with intent."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {workout.muscleGroups?.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-lime-400 px-4 py-2 text-xs font-semibold uppercase text-black"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-6">
                <div className="space-y-4">
                  <Spec
                    label="Equipment"
                    value={workout.equipment}
                  />

                  <Spec
                    label="Difficulty"
                    value={workout.difficulty}
                  />

                  <Spec
                    label="Sets"
                    value={workout.sets || "4"}
                  />

                  <Spec
                    label="Reps"
                    value={workout.reps || "6-8"}
                  />

                  <Spec
                    label="Duration"
                    value={`${workout.duration} min`}
                    icon={<Clock3 size={16} />}
                  />

                  <Spec
                    label="Calories"
                    value={`${workout.caloriesBurned} kcal`}
                    icon={<Flame size={16} />}
                  />

                  <Spec
                    label="Rating"
                    value={workout.rating}
                    icon={<Star size={16} />}
                  />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-5 text-xl font-black uppercase">
                  Instructions
                </h2>

                <ol className="space-y-4">
                  {(
                    workout.instructions || [
                      "Set up your equipment correctly.",
                      "Maintain proper form throughout the movement.",
                      "Perform each repetition with controlled movement.",
                      "Rest and repeat according to your plan.",
                    ]
                  ).map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-gray-400"
                    >
                      <span className="font-bold text-white">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleAddToPlan}
                  className="inline-flex items-center gap-2 rounded-3xl bg-lime-400 px-6 py-4 font-black uppercase text-black transition hover:bg-lime-300"
                >
                  <CalendarPlus size={18} />
                  Add to today&apos;s plan
                </button>

                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-3xl border border-white/20 px-6 py-4 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                  <Bookmark size={18} />
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Spec({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>

      <span className="flex items-center gap-2 text-sm font-bold text-white">
        {icon}
        {value}
      </span>
    </div>
  );
}
