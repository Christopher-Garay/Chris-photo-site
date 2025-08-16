import "../styles/globals.css";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export const metadata = {
  title: "Photography | Portfolio",
  description: "Work I'm proud of. Filter to jump to what you want to see.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash before Tailwind loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try{const p=localStorage.getItem('theme')||'system';const m=window.matchMedia('(prefers-color-scheme: dark)');const d=p==='dark'||(p==='system'&&m.matches);document.documentElement.classList.toggle('dark', d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold tracking-wide">Chris — Photos</Link>
            <nav className="hidden gap-6 sm:flex">
              <Link href="/portfolio" className="hover:opacity-80">Portfolio</Link>
              <Link href="/journal" className="hover:opacity-80">Journal</Link>
              <Link href="/contact" className="hover:opacity-80">Contact</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-border/80 bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-textMuted">
            © {new Date().getFullYear()} Chris Garay. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}