import type { Metadata } from "next";

export const SITE_URL = "https://datapowersource.com";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  alt: "Data Power Source — Metro Atlanta & the SE US Commercial & Industrial Electrical Contractor",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

const FAMILY_SOCIAL_IMAGES = {
  services: {
    url: "/services/opengraph-image",
    alt: "Data Power Source commercial electrical services",
  },
  industries: {
    url: "/industries/opengraph-image",
    alt: "Data Power Source electrical systems by industry",
  },
  projects: {
    url: "/projects/opengraph-image",
    alt: "Data Power Source commercial electrical project case studies",
  },
  about: {
    url: "/about/opengraph-image",
    alt: "About Data Power Source — serving Metro Atlanta since 1992",
  },
  contact: {
    url: "/contact/opengraph-image",
    alt: "Request a commercial electrical project quote from Data Power Source",
  },
} as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: { url: string; alt: string };
  type?: "website" | "article";
  index?: boolean;
};

function defaultSocialImage(path: PageMetadataInput["path"]) {
  const family =
    path === "/services"
      ? FAMILY_SOCIAL_IMAGES.services
      : path === "/industries"
        ? FAMILY_SOCIAL_IMAGES.industries
        : path === "/projects"
          ? FAMILY_SOCIAL_IMAGES.projects
          : path === "/about" || path.startsWith("/about/")
            ? FAMILY_SOCIAL_IMAGES.about
            : path === "/contact"
              ? FAMILY_SOCIAL_IMAGES.contact
              : DEFAULT_SOCIAL_IMAGE;

  return { ...family, width: 1200, height: 630, type: "image/png" as const };
}

export function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const selectedImage = image ?? defaultSocialImage(path);
  const socialImage = {
    url: absoluteUrl(selectedImage.url),
    alt: selectedImage.alt,
    ...(image ? {} : { width: 1200, height: 630, type: "image/png" as const }),
  };

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
