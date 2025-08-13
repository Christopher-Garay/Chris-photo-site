// app/layout.tsx
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// If you have global styles, keep this import:
import "./globals.css"; // <-- remove if you don't have it

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
