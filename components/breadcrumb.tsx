import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, inverse = false }: { items: BreadcrumbItem[]; inverse?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-small">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className={
                  inverse
                    ? "text-navy-300 transition-colors hover:text-white"
                    : "text-neutral-600 transition-colors hover:text-blue-600"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={inverse ? "text-white" : "text-navy-800"}>
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <CaretRight aria-hidden="true" className="size-3.5 text-blue-400" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
