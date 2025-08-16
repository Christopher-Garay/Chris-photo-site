
import { notFound } from "next/navigation";
import { GalleryView } from "../../../components/GalleryView";
import { galleriesBySlug } from "../../../lib/galleryData";

export default async function GalleryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ unwrap the Promise
  const gallery = galleriesBySlug.get(slug);
  if (!gallery) return notFound();
  return <GalleryView gallery={gallery} />;
}
