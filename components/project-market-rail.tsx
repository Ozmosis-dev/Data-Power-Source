const projectMarkets = [
  "Education",
  "Government",
  "Healthcare",
  "Data centers",
  "Broadcast",
  "Telecom",
] as const;

export function ProjectMarketRail() {
  return (
    <div
      data-testid="project-market-rail"
      className="mt-9 flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:gap-7"
    >
      <p className="shrink-0 text-sm font-semibold text-white">Industries represented</p>
      <ul
        data-testid="project-market-list"
        aria-label="Industries represented in the project portfolio"
        className="flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        {projectMarkets.map((label) => (
          <li
            key={label}
            data-testid="project-market-item"
            className="text-sm leading-5 text-navy-200"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
