import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
// app/layout.tsx
export const metadata = {
  metadataBase: new URL("https://www.lightandgaray.com"), // change this
  title: "Chris Garay Photography",
  description: "Clean, natural light photography with an airy feel.",
  alternates: { canonical: "https://lightandgaray.com" },
  openGraph: {
    title: "Chris Garay Photography",
    description: "Clean, natural light photography with an airy feel.",
    url: "https://yourdomain.com",
    siteName: "Chris Garcia Photography",
    images: ["/l&g-logo.jpg"], // drop a real image in /public
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Garay Photography",
    description: "Clean, natural light photography with an airy feel.",
    images: ["/l&g-logo.jpg"],
  },
};
