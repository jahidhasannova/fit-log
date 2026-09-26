"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-updated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-updated", updateCounts);
    };
  }, []);

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog Logo"
            className="h-10 w-auto"
            priority
          />

          <span className="text-2xl font-black uppercase tracking-tight text-white">
            FIT<span className="text-lime-400">LOG</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="order-3 flex w-full items-center justify-center gap-6 sm:order-none sm:w-auto sm:gap-8">
          <Link
            href="/"
            className={`text-sm font-bold uppercase transition ${
              workoutActive
                ? "text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold uppercase transition ${
              planActive
                ? "text-lime-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-black uppercase text-white transition hover:text-lime-400"
          >
            Plan

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-black uppercase text-white transition hover:text-lime-400"
          >
            Saved

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-xs font-black text-white">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}