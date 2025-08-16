// FILE: components/GalleryGrid.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { type GalleryMeta } from "../lib/galleryData";

export function GalleryGrid({ items }: { items: GalleryMeta[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map(item => (
        <li key={item.slug} className="group">
          <Link href={`/portfolio/${item.slug}`} className="card block overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[4/3] border-b border-border">
              <Image
                src={item.hero.src}
                alt={item.hero.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <h3 className="text-base font-semibold tracking-wide">{item.title}</h3>
                <p className="text-sm text-textMuted">{item.location} · {new Date(item.date).toLocaleDateString()}</p>
              </div>
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sm">View →</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}