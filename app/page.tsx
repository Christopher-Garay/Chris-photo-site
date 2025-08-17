"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FilterChips } from "../components/FilterChips";
import { GalleryGrid } from "../components/GalleryGrid";
import { galleries, type CategoryKey } from "../lib/galleryData";

export default function Home() {
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return galleries;
    return galleries.filter((g) => g.category === active);
  }, [active]);

  return (
    <section className="space-y-8">
      {/* Hero / intro card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-8 shadow">
        {/* soft background flourish */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(79,107,122,0.12),transparent_60%)]" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Chris Garay Photography</h1>
        <p className="mt-2 max-w-prose text-textMuted">
          Clean, natural light photography with an airy feel.
        </p>

        {/* Filters right in the hero */}
        <div className="mt-6">
          <FilterChips active={active} onChange={setActive} />
        </div>

        {/* Secondary nav hint */}
        <div className="mt-3 text-sm text-textMuted">
          Prefer the old view?{" "}
          <Link href="/portfolio" className="underline hover:opacity-80">
            Open full portfolio page →
          </Link>
        </div>
      </div>

      {/* Gallery grid */}
      <GalleryGrid items={filtered} />

      {filtered.length === 0 && (
        <p className="rounded-lg border border-border bg-surface p-6 text-textMuted">
          No matches. Try clearing a filter.
        </p>
      )}
    </section>
  );
}
