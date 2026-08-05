import type { CSSProperties } from "react";

import {
  getDisciplineColor,
  type ServiceDiscipline,
} from "@/components/brand-service-mark";
import { cn } from "@/lib/utils";

export const projectServiceDisciplines = [
  "electrical",
  "mission-critical",
  "connectivity",
  "design-build",
] as const satisfies readonly ServiceDiscipline[];

const serviceLabels: Record<ServiceDiscipline, string> = {
  electrical: "Commercial & Industrial Electrical",
  "mission-critical": "Mission Critical Power",
  connectivity: "Low Voltage & Connectivity",
  "design-build": "Engineering & Design-Build",
};

export function ProjectServiceIndicators({
  disciplines,
  labelled = false,
  className,
}: {
  disciplines: readonly ServiceDiscipline[];
  labelled?: boolean;
  className?: string;
}) {
  const names = disciplines.map((discipline) => serviceLabels[discipline]);

  return (
    <ul
      data-testid={labelled ? "project-service-legend" : "project-service-indicators"}
      aria-label={labelled ? "Project service color legend" : `Services: ${names.join(", ")}`}
      className={cn(
        "flex flex-wrap items-center",
        labelled ? "gap-x-5 gap-y-2" : "gap-2",
        className,
      )}
    >
      {disciplines.map((discipline) => (
        <li
          key={discipline}
          data-discipline={discipline}
          title={serviceLabels[discipline]}
          className={cn(
            "inline-flex items-center",
            labelled && "gap-2 text-xs font-medium text-neutral-600",
          )}
        >
          <span
            data-testid="project-service-dot"
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full ring-2 ring-white/85 shadow-[0_0_0_1px_rgba(5,33,70,0.2)]"
            style={
              { backgroundColor: getDisciplineColor(discipline) } as CSSProperties
            }
          />
          {labelled ? (
            <span>{serviceLabels[discipline]}</span>
          ) : (
            <span className="sr-only">{serviceLabels[discipline]}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
