import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";

const routes = [
  "",
  "/about",
  "/about/safety",
  "/about/values",
  "/services",
  "/services/commercial-industrial-electrical",
  "/services/mission-critical-power",
  "/services/low-voltage-connectivity",
  "/services/engineering-design-build",
  "/industries",
  "/projects",
  "/faq",
  "/contact",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return [...routes, ...projectRoutes].map((route) => ({
    url: `https://datapowersource.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/about" || route === "/services" || route === "/projects" || route === "/contact"
          ? 0.9
          : 0.7,
  }));
}
