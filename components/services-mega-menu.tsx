"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";

import { BrandServiceMark } from "@/components/brand-service-mark";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function ServicesMegaMenu({ active = false }: { active?: boolean }) {
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
            Services
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
          <NavigationMenu.Content className="absolute left-1/2 top-[calc(100%+21px)] w-[820px] -translate-x-1/2 border border-neutral-200 bg-white p-3 shadow-[0_28px_80px_-42px_rgba(5,33,70,0.55)] data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Systems / four disciplines
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-success">
                All systems online
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {site.services.map((service, index) => (
                <NavigationMenu.Link key={service.href} asChild>
                  <Link
                    href={service.href}
                    className="group/item grid grid-cols-[4.5rem_1fr] items-center gap-4 p-4 transition-colors duration-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    <BrandServiceMark
                      discipline={service.discipline}
                      className="h-14 w-16"
                    />
                    <span>
                      <span className="block font-display text-[0.92rem] font-semibold text-navy-800 group-hover/item:text-brand-600">
                        {service.label}
                      </span>
                      <span className="mt-1 block text-small text-neutral-600">{service.description}</span>
                      <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-neutral-400">
                        Module 0{index + 1}
                      </span>
                    </span>
                  </Link>
                </NavigationMenu.Link>
              ))}
            </div>
            <NavigationMenu.Link asChild>
              <Link
                href="/services"
                className="mt-2 flex items-center justify-between bg-brand-600 px-5 py-4 font-semibold text-white transition-colors duration-300 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                View all services
                <ArrowRight aria-hidden="true" size={16} weight="bold" />
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
