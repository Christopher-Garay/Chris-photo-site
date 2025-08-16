"use client";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as ThemeMode) || "system";
    setMode(stored);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (m: ThemeMode) => {
      const wantsDark = m === "dark" || (m === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", wantsDark);
    };
    apply(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const cycle = () => setMode(prev => (prev === "light" ? "dark" : prev === "dark" ? "system" : "light"));

  return (
    <button
      aria-label={`Theme: ${mode}`}
      onClick={cycle}
      className="rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
    >
      {mode === "light" ? "Light" : mode === "dark" ? "Dark" : "System"}
    </button>
  );
}