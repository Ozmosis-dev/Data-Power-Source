"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function parseCounter(value: string) {
  const match = value.match(/^(\d+)(\+)?$/);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

export function StatCounter({
  value,
  suffix,
  label,
  index,
}: {
  value: string;
  suffix: string;
  label: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = useMemo(() => parseCounter(value), [value]);
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setDisplay(value), 0);
      return () => window.clearTimeout(timer);
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const started = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - started) / 800, 1);
          const current = Math.round(parsed.target * (1 - Math.pow(1 - progress, 3)));
          setDisplay(`${current}${parsed.suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed, value]);

  return (
    <div ref={ref} className="px-5">
      {index ? (
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
          Metric / 0{index}
        </p>
      ) : null}
      <p className="whitespace-nowrap font-display text-[2.35rem] font-bold tracking-[-0.035em] text-white md:text-[2.7rem]">
        <span data-testid="stat-value">{display}</span>
        <span className="text-blue-300">{suffix}</span>
      </p>
      <p className="mt-2 max-w-[240px] text-small leading-relaxed text-navy-200">{label}</p>
    </div>
  );
}
