"use client";

import Link from "next/link";
export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-wide">Work I’m proud of.</h1>
      <p className="max-w-prose text-textMuted">Filter to jump to what you want to see.</p>
      <div>
        <Link href="/portfolio" className="inline-block rounded-xl border border-border bg-surface px-4 py-2 shadow-sm hover:shadow">View Portfolio</Link>
      </div>
    </section>
  );
}