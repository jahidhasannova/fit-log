import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog Logo"
            className="h-10 w-auto"
          />

          <span className="text-2xl font-semibold uppercase tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-right text-sm text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}