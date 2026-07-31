import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type ServiceDiscipline = "electrical" | "mission-critical" | "connectivity" | "design-build";

const marks = {
  electrical: {
    src: "/brand/service-electrical.svg",
    alt: "Electrical service symbol",
    width: 153,
    height: 105,
    color: "#162792",
    surface: "#162792",
  },
  "mission-critical": {
    src: "/brand/service-mission-critical.svg",
    alt: "Mission critical service symbol",
    width: 112,
    height: 111,
    color: "#EB3B08",
    surface: "#B9330E",
  },
  connectivity: {
    src: "/brand/service-connectivity.svg",
    alt: "Connectivity service symbol",
    width: 109,
    height: 96,
    color: "#0C9E1F",
    surface: "#08751A",
  },
  "design-build": {
    src: "/brand/service-design-build.svg",
    alt: "Design-build service symbol",
    width: 60,
    height: 108,
    color: "#1A1A1A",
    surface: "#1A1A1A",
  },
} as const;

export function getDisciplineColor(discipline: ServiceDiscipline) {
  return marks[discipline].color;
}

export function getDisciplineSurfaceColor(discipline: ServiceDiscipline) {
  return marks[discipline].surface;
}

export function BrandServiceMark({
  discipline,
  className,
  plate = false,
  testId,
}: {
  discipline: ServiceDiscipline;
  className?: string;
  plate?: boolean;
  testId?: string;
}) {
  const mark = marks[discipline];

  return (
    <span
      data-testid={testId}
      className={cn(
        "inline-flex items-center justify-center",
        plate && "rounded-lg border border-neutral-100 bg-white p-3 shadow-sm",
        className,
      )}
      style={{ "--discipline-color": mark.color } as CSSProperties}
    >
      <Image
        src={mark.src}
        alt={mark.alt}
        width={mark.width}
        height={mark.height}
        unoptimized
        loading="eager"
        className="h-auto w-auto max-h-full max-w-full object-contain"
      />
    </span>
  );
}
