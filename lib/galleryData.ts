// FILE: lib/galleryData.ts
import { generatedGalleries } from "./galleries.manifest";
export type CategoryKey = "people" | "landscapes" | "animals";
export const categories: Record<CategoryKey, string> = {
  people: "People",
  landscapes: "Landscapes",
  animals: "Animals & Pets",
};

export type ImageMeta = {
  src: string;
  alt: string;
  meta: { camera: string; settings: string };
};

export type GalleryMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  location: string;
  category: CategoryKey;
  hero: { src: string; alt: string };
};

export type Gallery = GalleryMeta & { images: ImageMeta[]; description?: string };

export const galleries: Gallery[] = generatedGalleries as unknown as Gallery[];

export const galleriesBySlug = new Map(galleries.map(g => [g.slug, g] as const));