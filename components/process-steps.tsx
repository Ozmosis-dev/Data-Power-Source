import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";

export function ProcessSteps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="mt-12 grid gap-px overflow-hidden border border-navy-600 bg-navy-600 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="technical-grid group relative min-h-[270px] bg-navy-800 p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-blue-200">
              PHASE / 0{index + 1}
            </span>
            <ArrowDownRight
              aria-hidden="true"
              className="size-5 text-navy-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </div>
          <h3 className="mt-12 font-display text-h3 font-semibold text-white">{step.title}</h3>
          <p className="mt-4 text-base text-navy-200">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
