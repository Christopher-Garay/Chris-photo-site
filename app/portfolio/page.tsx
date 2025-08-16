"use client";

import { useMemo, useState } from "react";
import { GalleryGrid } from "../../components/GalleryGrid";
import { FilterChips } from "../../components/FilterChips";
import { galleries, categories, type CategoryKey } from "../../lib/galleryData";

export default function PortfolioPage() {
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return galleries;
    return galleries.filter((g) => g.category === active);
  }, [active]);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-wide">Portfolio</h1>
        <p className="max-w-prose text-textMuted">
          Browse by category. Click a gallery to open images in a lightbox.
        </p>
      </header>

      <FilterChips active={active} onChange={setActive} />
      <GalleryGrid items={filtered} />

      {filtered.length === 0 && (
        <p className="rounded-lg border border-border bg-surface p-6 text-textMuted">
          No matches. Try clearing a filter.
        </p>
      )}
    </section>
  );
}

