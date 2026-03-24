"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Avoid flash of wrong icon
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      className="relative w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center hover:border-gold/40 transition-all duration-300 group"
    >
      {/* Sol */}
      <svg
        className={`w-[18px] h-[18px] text-gold absolute transition-all duration-500 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-50"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
      </svg>
      {/* Luna */}
      <svg
        className={`w-[18px] h-[18px] text-gold absolute transition-all duration-500 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-50"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path d="M21.752 15.002A9.718 9.718 0 0112.478 3.21a9.72 9.72 0 109.274 11.792z" />
      </svg>
    </button>
  );
}
