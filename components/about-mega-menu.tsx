"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  Buildings,
  CaretDown,
  CompassTool,
  ShieldCheck,
} from "@phosphor-icons/react";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const icons = {
  overview: Buildings,
  safety: ShieldCheck,
  values: CompassTool,
} as const;

export function AboutMegaMenu({ active = false }: { active?: boolean }) {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "group relative inline-flex h-10 items-center gap-1.5 px-3 text-sm font-semibold text-navy-700 transition-colors duration-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
              active && "text-brand-600",
            )}
          >
            About
            <CaretDown
              aria-hidden="true"
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-3 -bottom-[18px] h-0.5 origin-left bg-brand-600 transition-transform duration-300",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-1/2 top-[calc(100%+21px)] w-[680px] -translate-x-1/2 border border-neutral-200 bg-white p-3 shadow-[0_28px_80px_-42px_rgba(5,33,70,0.55)] data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out">
            <div className="border-b border-neutral-100 px-4 py-3">
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                About Data Power Source
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-2">
              {site.about.map((item) => {
                const Icon = icons[item.key];

                return (
                  <NavigationMenu.Link key={item.href} asChild>
                    <Link
                      href={item.href}
                      aria-label={item.menuLabel}
                      className="group/item min-h-[150px] border-t-2 border-neutral-200 p-4 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <span className="grid size-10 place-items-center rounded-md border border-brand-200 bg-white text-brand-600">
                        <Icon aria-hidden="true" size={20} weight="regular" />
                      </span>
                      <span className="mt-5 block font-display text-[0.95rem] font-semibold text-navy-800 group-hover/item:text-brand-700">
                        {item.menuLabel}
                      </span>
                      <span className="mt-1.5 block text-small leading-relaxed text-neutral-600">
                        {item.description}
                      </span>
                    </Link>
                  </NavigationMenu.Link>
                );
              })}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
