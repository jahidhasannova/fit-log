import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-lime-400/50"
    >
      <div className="h-56 overflow-hidden bg-zinc-800">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-2 font-semibold text-gray-500">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock3 size={16} className="text-lime-400" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={16} className="text-orange-400" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}