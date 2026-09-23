import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Data Power Source",
    short_name: "DPS",
    description:
      "Commercial and industrial electrical services for facilities across Metro Atlanta & the SE US.",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#031126",
    icons: [
      {
        src: "/brand/DPS-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
