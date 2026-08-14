import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
  redirects: async () => [
    { source: "/about-us", destination: "/about", permanent: true },
    { source: "/about/contact-information", destination: "/contact", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/contact-us/contact-us-handler", destination: "/contact", permanent: true },
    {
      source: "/services/electrical-services",
      destination: "/services/commercial-industrial-electrical",
      permanent: true,
    },
    {
      source: "/services/connectivity-services",
      destination: "/services/low-voltage-connectivity",
      permanent: true,
    },
    {
      source: "/services/mission-critical-services",
      destination: "/services/mission-critical-power",
      permanent: true,
    },
    {
      source: "/services/engineering-and-design",
      destination: "/services/engineering-design-build",
      permanent: true,
    },
    { source: "/category/projects", destination: "/projects", permanent: true },
    { source: "/projects-old", destination: "/projects", permanent: true },
    { source: "/privacy-policy", destination: "/privacy", permanent: true },
    // These author archives contained the same project portfolio. Keep the mappings
    // provisional until the client reviews Search Console and backlink data.
    { source: "/author/admin", destination: "/projects", permanent: true },
    { source: "/author/dpsadmin", destination: "/projects", permanent: true },
  ],
};

export default nextConfig;
