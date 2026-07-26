import {
  CheckCircle,
  Crane,
  Drop,
  FileText,
  FirstAidKit,
  HardHat,
  Heartbeat,
  Ladder,
  Prohibit,
  ShieldCheck,
  Shovel,
  TrafficCone,
} from "@phosphor-icons/react/dist/ssr";

type SafetyCredential = {
  readonly title: string;
  readonly category: string;
  readonly icon: string;
};

function SafetyIcon({ name }: { name: string }) {
  const props = {
    "aria-hidden": true,
    size: 26,
    weight: "regular" as const,
  };

  switch (name) {
    case "drop":
      return <Drop {...props} />;
    case "heartbeat":
      return <Heartbeat {...props} />;
    case "crane":
      return <Crane {...props} />;
    case "first-aid":
      return <FirstAidKit {...props} />;
    case "hard-hat":
      return <HardHat {...props} />;
    case "ladder":
      return <Ladder {...props} />;
    case "shovel":
      return <Shovel {...props} />;
    case "traffic-cone":
      return <TrafficCone {...props} />;
    case "prohibit":
      return <Prohibit {...props} />;
    default:
      return <ShieldCheck {...props} />;
  }
}

export function SafetyAuthorityWall({
  credentials,
  emr,
  controls,
}: {
  credentials: readonly SafetyCredential[];
  emr: {
    readonly value: string;
    readonly label: string;
    readonly note: string;
    readonly years: readonly string[];
  };
  controls: readonly string[];
}) {
  return (
    <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-12">
      <div
        data-testid="safety-left-column"
        className="grid gap-4 lg:col-span-4 lg:grid-rows-[auto_1fr]"
      >
        <article
          data-testid="safety-emr"
          className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-7 shadow-sm lg:p-8"
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-600" />
          <ShieldCheck aria-hidden="true" className="size-8 text-brand-600" weight="regular" />
          <p className="mt-8 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
            {emr.label}
          </p>
          <p className="mt-3 font-display text-[3.7rem] font-bold leading-none tracking-[-0.055em] text-navy-800 sm:text-[4.35rem]">
            {emr.value}
          </p>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-neutral-600">{emr.note}</p>

          <div className="mt-8 grid grid-cols-3 border border-neutral-200 bg-white">
            {emr.years.map((year, index) => (
              <div
                key={`${year}-${index}`}
                className="border-r border-neutral-200 px-3 py-4 text-center last:border-r-0"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-neutral-500">
                  Year {index + 1}
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-navy-800">{year}</p>
              </div>
            ))}
          </div>
        </article>

        <article
          data-testid="program-controls"
          className="flex h-full flex-col rounded-xl border border-navy-600 bg-navy-950/85 p-6"
        >
          <div className="flex items-center gap-3">
            <FileText aria-hidden="true" className="size-6 text-blue-300" weight="regular" />
            <h3 className="font-display text-lg font-semibold text-white">
              Program controls
            </h3>
          </div>
          <div className="mt-6 grid flex-1 content-center gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {controls.map((control) => (
              <div
                key={control}
                className="flex items-center gap-3 text-small text-navy-100"
              >
                <CheckCircle
                  data-testid="program-control-check"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-blue-300"
                  weight="fill"
                />
                <span>{control}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div
        data-testid="safety-credential-grid"
        className="grid h-full gap-3 sm:grid-cols-2 lg:col-span-8"
      >
        {credentials.map((credential) => (
          <article
            key={credential.title}
            data-testid="safety-badge"
            className="group grid min-h-32 grid-cols-[52px_1fr] items-center gap-4 rounded-xl border border-navy-600 bg-navy-800/90 p-4 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-navy-700 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <span className="grid size-[52px] place-items-center rounded-full border border-blue-300/60 bg-blue-400/15 text-blue-100 transition-colors group-hover:bg-blue-400 group-hover:text-navy-950">
              <SafetyIcon name={credential.icon} />
            </span>
            <span>
              <span className="block font-display text-[1rem] font-semibold leading-snug text-white">
                {credential.title}
              </span>
              <span
                data-testid="safety-category"
                className="mt-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.1em] text-navy-200"
              >
                {credential.category}
              </span>
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
