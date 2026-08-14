import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { serviceDetails } from "@/content/service-details";
import { absoluteUrl } from "@/lib/seo";

const coreRoutes = [
  "/",
  "/about",
  "/about/safety",
  "/about/values",
  "/services",
  "/industries",
  "/projects",
  "/faq",
  "/contact",
  "/site-map",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = Object.keys(serviceDetails).map((slug) => `/services/${slug}`);
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return [...coreRoutes, ...serviceRoutes, ...projectRoutes].map((route) => ({
    url: absoluteUrl(route),
  }));
}
