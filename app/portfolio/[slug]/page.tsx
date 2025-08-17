import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GalleryView } from "../../../components/GalleryView";
import { galleriesBySlug, categories } from "../../../lib/galleryData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;           // Next 15: params is a Promise
  const g = galleriesBySlug.get(slug);
  if (!g) return { title: "Gallery not found" };
  return {
    title: `${g.title} — ${categories[g.category]}`,
    description: g.description || `${g.title} shot in ${g.location}`,
    openGraph: {
      title: `${g.title} — ${categories[g.category]}`,
      description: g.description || `${g.title} shot in ${g.location}`,
      images: [g.hero?.src || (g.images[0]?.src ?? "")],
      type: "website",
    },
  };
}

export default async function GalleryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = galleriesBySlug.get(slug);
  if (!gallery) return notFound();
  return <GalleryView gallery={gallery} />;
}
