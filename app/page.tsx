"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Instagram, Smartphone, MapPin, Moon, Sun } from "lucide-react";
const IG_URL = "https://instagram.com/<crzgar717>";
const IG_URL = "https://instagram.com/<crzgar717>?utm_source=website&utm_medium=nav&utm_campaign=header";

// ----------------------------
// Types & Data
// ----------------------------
type Photo = { src: string; w: number; h: number; title: string };

const PHOTOS: Photo[] = [
  { src: "/images/01.jpg", w: 1600, h: 1067, title: "Coastal light" },
  { src: "/images/02.jpg", w: 1600, h: 1067, title: "Quiet strength" },
  { src: "/images/03.jpg", w: 1600, h: 1067, title: "Soft mornings" },
  { src: "/images/04.jpg", w: 1600, h: 1067, title: "Windswept" },
  { src: "/images/05.jpg", w: 1600, h: 1067, title: "Golden hour" },
  { src: "/images/06.jpg", w: 1600, h: 1067, title: "Lines & light" },
  { src: "/images/07.jpg", w: 1600, h: 1067, title: "Still water" },
  { src: "/images/08.jpg", w: 1600, h: 1067, title: "Open road" },
  { src: "/images/09.jpg", w: 1600, h: 1067, title: "City hush" },
];

// ----------------------------
// Hooks: Theme & Scroll Lock
// ----------------------------
function useDarkMode() {
  const [dark, setDark] = useState(false);

  // Initialize from localStorage or system preference
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") setDark(true);
    else if (saved === "light") setDark(false);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setDark(true);
  }, []);

  // Apply to <html> and persist
  useEffect(() => {
    const el = document.documentElement;
    if (dark) el.classList.add("dark");
    else el.classList.remove("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return { dark, setDark } as const;
}

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const original = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = original;
    };
  }, [locked]);
}

export default function Home() {
  const { dark, setDark } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useScrollLock(open);

  const activePhoto = useMemo(() => PHOTOS[active], [active]);

  const closeLightbox = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % PHOTOS.length), []);

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLightbox, prev, next]);

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" aria-label="Home" className="flex items-center gap-3 font-semibold tracking-tight">
            <Image
              src="/brand/logo-white.png" // must exist at public/brand/logo-white.png
              alt="Christopher Garay Logo"
              width={140}
              height={32}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#work" className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded">Work</Link>
            <Link href="#about" className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded">About</Link>
            <Link href="#services" className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded">Services</Link>
            <Link href="#contact" className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((v) => !v)}
              className="rounded-full p-2 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              type="button"
            >
              {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
            </button>
            <Link
              href="#contact"
              className="hidden sm:inline-block rounded-2xl px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              Book
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Timeless images,<br className="hidden md:block" /> clean, honest story.
              </h1>
              <p className="mt-5 text-zinc-600 dark:text-zinc-300 max-w-prose">
                Natural light. Minimal editing. Real moments. Sessions tailored for couples, portraits, and brand stories.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="#work"
                  className="rounded-2xl px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm"
                >
                  View Work
                </Link>
                <Link
                  href="#contact"
                  className="rounded-2xl px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm"
                >
                  Inquire
                </Link>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <Image
                src={PHOTOS[0].src}
                alt={PHOTOS[0].title}
                width={PHOTOS[0].w}
                height={PHOTOS[0].h}
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
                }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
            <p className="text-sm text-zinc-500">Nine-image sampler. Swap for your sets.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PHOTOS.map((p, i) => (
              <button
                key={p.src}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                type="button"
                aria-label={`Open ${p.title}`}
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left">
                  <p className="text-white text-xs tracking-wide">{p.title}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">About Chris</h2>
              <p className="text-zinc-600 dark:text-zinc-300 max-w-prose">
                Hello, I’m Chris, a Marine by trade, but a storyteller by choice. My love for photography started back at San Francisco State University, where I minored in cinema. I’ve always been fascinated by the way a single image can freeze a pure, unrepeatable moment in time. Film does it beautifully, but photography is the art that came first, the precursor to the moving picture, and still my favorite way to tell a story.
                <br /><br />
                Behind the camera, I’m mostly a quiet observer. I like to let people settle in, find their rhythm, and show me their real selves. But when the moment calls for it, I’ll step in with guidance, energy, and ideas to make sure we create the shot we’re both excited about. My favorite thing to capture? People, those honest, unguarded moments where comfort sets in and personality comes through. Watching someone go from stiff and unsure to relaxed, confident, and fully in their element is pure magic to me.
                <br /><br />
                Photography isn’t just about what’s in the frame, it’s about the experience of getting there. My Marine Corps background means I bring attention to detail, adaptability, and the willingness to get dirty if it means nailing the shot. Different personalities, unpredictable environments, tight timelines, I thrive in them all. And yes, I will absolutely crouch in the mud or climb something questionable if that’s what it takes.
                <br /><br />
                My editing style is natural and cinematic. I gravitate toward true-to-life tones, but I’m not afraid of bold color when the mood calls for it. The right blend of lighting and color grading can turn a good image into one that feels timeless.
                <br /><br />
                When I’m not shooting, you’ll probably find me running (marathons are my idea of fun), watching movies, or hanging out with my two cats, Bam Bam and Mau Mau.
                <br /><br />
                If you’re nervous about getting in front of the camera, here’s my advice: just be yourself. The best images are the ones where your authenticity shines through. My job is to help you relax, have fun, and enjoy the process so that when you look at your photos later, you see you: confident, beautiful, and completely present in that moment.
                <br /><br />
                Let’s make something you’ll want to keep forever.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
              <h3 className="font-medium mb-2">Based in</h3>
              <p className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                Monterey, CA • Available worldwide
              </p>
              <h3 className="font-medium mt-4 mb-2">Specialties</h3>
              <ul className="text-sm list-disc ml-5 space-y-1">
                <li>Couples and Portraits</li>
                <li>Events and Editorial</li>
                <li>Brand stories</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Services</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Portrait Sessions",
                desc:
                  "Perfect for individuals who want to capture their true self — whether it’s for personal branding, a milestone, or just because. We’ll find your best angles, best light, and the mood that feels authentically you.",
              },
              {
                name: "Couples & Engagement",
                desc:
                  "Celebrate your connection with photos that feel genuine and unposed. I’ll guide you when needed, but mostly I’ll catch the laughs and little glances that make your relationship yours.",
              },
              {
                name: "Brand & Editorial",
                desc:
                  "For businesses, creatives, and entrepreneurs who want visuals that stand out. We’ll create images that reflect your style and story so your audience connects instantly.",
              },
            ].map((s) => (
              <div key={s.name} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.desc}</p>
                <Link href="#contact" className="inline-block mt-4 text-sm underline underline-offset-4">Inquire</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Let’s make something you will want to frame</h2>
              <div className="hidden sm:flex gap-3">
                <a href="mailto:hello@example.com" className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800" aria-label="Email">
                  <Mail className="h-4 w-4" aria-hidden />
                </a>
                <a
  href={IG_URL}
  target="_blank"
  rel="noreferrer noopener"
  className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800"
  aria-label="Instagram"
>
  <Instagram className="h-4 w-4" aria-hidden />
</a>

                <a href="tel:+15555551234" className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800" aria-label="Phone">
                  <Smartphone className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="grid md:grid-cols-3 gap-4">
              <input className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Your name" name="name" />
              <input className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Email" name="email" />
              <input className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="What are you looking for?" name="subject" />
              <textarea className="md:col-span-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" rows={4} placeholder="Share a bit about your vision, dates, and location." name="message" />
              <div className="md:col-span-3 flex items-center justify-between">
                <p className="text-xs text-zinc-500">By submitting, you agree to be contacted by email.</p>
                <button type="submit" className="rounded-2xl px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm">Send</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Christopher Garay
      </footer>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox for ${activePhoto.title}`}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activePhoto.src}
              alt={activePhoto.title}
              width={activePhoto.w}
              height={activePhoto.h}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="w-full h-auto rounded-2xl"
              priority
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={closeLightbox}
                className="rounded-full px-3 py-1 bg-white/90 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-400"
                type="button"
              >
                Close
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-2 mx-auto w-full max-w-md flex items-center justify-between gap-2 px-2">
              <button
                onClick={prev}
                className="rounded-full px-4 py-2 bg-white/90 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-400"
                type="button"
              >
                Prev
              </button>
              <span className="text-white text-xs opacity-90 line-clamp-1 text-center">{activePhoto.title}</span>
              <button
                onClick={next}
                className="rounded-full px-4 py-2 bg-white/90 text-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-400"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
