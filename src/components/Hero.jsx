import { ArrowDown } from "lucide-react";
import Image from "next/image";
import banner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-black px-6 py-12 md:py-4">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-zinc-900 px-8 py-10 md:grid-cols-2 md:gap-16 md:px-12 md:py-12 lg:px-16">
        
        <div>
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            <span className="whitespace-nowrap">
              TRAIN WITH INTENT. LOG
            </span>
            <br />
            EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-lime-400 px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-lime-300"
          >
            Browse Workouts
            <ArrowDown size={18} />
          </a>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={banner}
            alt="Workout training"
            className="h-auto w-full max-w-lg object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}