import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

export function PlaceholderMedia({
  alt,
  label = "Job-site photography pending",
  className,
  index,
}: {
  alt: string;
  label?: string;
  className?: string;
  index?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative isolate min-h-[280px] overflow-hidden rounded-xl border border-navy-600 bg-navy-800",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-40">
        <span className="absolute left-[12%] top-0 h-full w-px bg-navy-500" />
        <span className="absolute left-[42%] top-0 h-full w-px bg-navy-500" />
        <span className="absolute left-[72%] top-0 h-full w-px bg-navy-500" />
        <span className="absolute left-0 top-[24%] h-px w-full bg-navy-500" />
        <span className="absolute left-0 top-[58%] h-px w-full bg-navy-500" />
        <span className="absolute -right-12 bottom-10 size-56 rounded-full border border-blue-300/45" />
        <span className="absolute -right-4 bottom-20 size-36 rounded-full border border-blue-300/45" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-navy-600 bg-navy-900/90 p-5">
        <span className="flex items-center gap-2 text-small text-navy-200">
          <ImageSquare aria-hidden="true" className="size-4 text-blue-300" />
          {label}
        </span>
        {index ? <span className="text-overline font-semibold text-blue-300">{index}</span> : null}
      </div>
    </div>
  );
}
