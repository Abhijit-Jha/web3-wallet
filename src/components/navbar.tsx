"use client";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-5 z-50 mx-4 sm:mx-10 mt-6 px-6 py-3 sm:px-10 sm:py-4 flex justify-between items-center rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-xl backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 transition-all">
      <span
        className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
        onClick={() => router.push("/")}
      >
        IronSeed
      </span>

      <div className="flex items-center gap-4">
        {/* Future nav items can go here */}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
