import type { Metadata } from "next";

export const SITE_URL = "https://datapowersource.com";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  alt: "Data Power Source — Electrical Solutions for Business Continuity",
} as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: { url: string; alt: string };
  type?: "website" | "article";
  index?: boolean;
};

export function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = { url: absoluteUrl(image.url), alt: image.alt };

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type,
      siteName: "Data Power Source",
      locale: "en_US",
      url,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
