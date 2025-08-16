// FILE: components/GalleryView.tsx
"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { type Gallery } from "../lib/galleryData";
import Link from "next/link";


export function GalleryView({ gallery }: { gallery: Gallery }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex(i => (i === null ? 0 : (i + 1) % gallery.images.length)), [gallery.images.length]);
  const prev = useCallback(() => setIndex(i => (i === null ? 0 : (i - 1 + gallery.images.length) % gallery.images.length)), [gallery.images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, next, prev, close]);

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-wide">{gallery.title}</h1>
        <p className="text-textMuted">{gallery.location} · {new Date(gallery.date).toLocaleDateString()}</p>
        {gallery.description && <p className="max-w-prose">{gallery.description}</p>}
        <Link
  href="/portfolio"
  className="inline-flex items-center gap-1 text-sm text-textMuted hover:opacity-80"
>
  ← Back to portfolio
</Link>

      </header>
      <ul className="masonry grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {gallery.images.map((img, i) => (
          <li key={img.src}>
            <button
              onClick={() => open(i)}
              className="card block w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
            >
              <div className="relative aspect-[4/3]">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm p-4"
          onClick={close}
        >
          <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[16/10] bg-black/80">
              <Image src={gallery.images[index].src} alt={gallery.images[index].alt} fill sizes="100vw" className="rounded-2xl object-contain" />
            </div>
            <div className="surface-veil flex items-center justify-between gap-3 border-t border-border p-3 text-sm rounded-b-2xl">
              <div className="truncate text-textMuted">
                Shot on {gallery.images[index].meta.camera} at {gallery.images[index].meta.settings}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="rounded-lg border border-border bg-surface px-3 py-1 hover:shadow ring-1 ring-border/60">← Prev</button>
                <button onClick={next} className="rounded-lg border border-border bg-surface px-3 py-1 hover:shadow ring-1 ring-border/60">Next →</button>
                <button onClick={close} className="rounded-lg border border-border bg-surface px-3 py-1 hover:shadow ring-1 ring-border/60">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}