cat > app/layout.tsx <<'EOF'
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lightandgaray.com"),
  title: {
    default: "Chris Garay Photography",
    template: "%s | Chris Garay Photography",
  },
  description: "Clean, natural light photography with an airy feel.",
  alternates: { canonical: "https://www.lightandgaray.com" },
  openGraph: {
    title: "Chris Garay Photography",
    description: "Clean, natural light photography with an airy feel.",
    url: "https://www.lightandgaray.com",
    siteName: "Chris Garay Photography",
    images: ["/lg-logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Garay Photography",
    description: "Clean, natural light photography with an airy feel.",
    images: ["/lg-logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
EOF
