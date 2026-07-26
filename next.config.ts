import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
  redirects: async () => [
    { source: "/about-us/", destination: "/about", permanent: true },
    {
      source: "/services/electrical-services/",
      destination: "/services/commercial-industrial-electrical",
      permanent: true,
    },
    {
      source: "/services/connectivity-services/",
      destination: "/services/low-voltage-connectivity",
      permanent: true,
    },
    {
      source: "/services/mission-critical-services/",
      destination: "/services/mission-critical-power",
      permanent: true,
    },
    {
      source: "/services/engineering-and-design/",
      destination: "/services/engineering-design-build",
      permanent: true,
    },
    { source: "/category/projects/", destination: "/projects", permanent: true },
    { source: "/contact-us/", destination: "/contact", permanent: true },
  ],
};

export default nextConfig;
