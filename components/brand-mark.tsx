import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  inverse?: boolean;
  kind?: "text" | "full" | "icon";
  tone?: "brand" | "white";
  size?: "default" | "large";
  testId?: string;
  className?: string;
};

const assets = {
  text: {
    src: "/brand/DPS-text-logo.svg",
    width: 1642,
    height: 244,
    alt: "Data Power Source — Electrical Services for Business",
  },
  full: {
    src: "/brand/DPS-full-logo.svg",
    width: 1642,
    height: 375,
    alt: "Data Power Source electrical, connectivity, mission critical, and design-build services",
  },
  icon: {
    src: "/brand/DPS-icon.svg",
    width: 403,
    height: 372,
    alt: "Data Power Source",
  },
} as const;

export function BrandMark({
  inverse = false,
  kind = "text",
  tone = "brand",
  size = "default",
  testId,
  className,
}: BrandMarkProps) {
  const asset = assets[kind];

  return (
    <Link
      href="/"
      aria-label="Data Power Source home"
      data-testid={testId}
      data-logo-tone={tone}
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
        inverse && "rounded-lg bg-white px-3 py-2 focus-visible:ring-offset-navy-900",
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        unoptimized
        priority={kind === "text" || kind === "full"}
        className={cn(
          "w-auto object-contain object-left",
          kind === "text" && size === "default" && "h-9 sm:h-10",
          kind === "text" && size === "large" && "h-12 sm:h-14",
          kind === "full" && "h-auto max-h-28",
          kind === "icon" && "h-10",
          tone === "white" && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
