import { SectionBand, SectionHeader } from "@/components/section-band";
import { StatCounter } from "@/components/stat-counter";

type ProofMetric = {
  readonly value: string;
  readonly suffix: string;
  readonly label: string;
};

export function ProofBand({
  overline,
  title,
  body,
  items,
  metricsTestId,
  showHeader = true,
}: {
  overline: string;
  title: string;
  body: string;
  items: readonly ProofMetric[];
  metricsTestId?: string;
  showHeader?: boolean;
}) {
  return (
    <SectionBand
      theme="navy"
      compact
      className="py-12 md:py-14"
      data-testid="proof-band"
      data-variant="shared-proof-band"
    >
      <div className="mx-auto max-w-container px-5 sm:px-6">
        {showHeader ? (
          <SectionHeader
            overline={overline}
            title={title}
            body={body}
            inverse
            className="max-w-4xl"
          />
        ) : null}
        <div data-testid={metricsTestId}>
          <div
            data-testid="proof-metrics"
            className={`grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 ${
              showHeader ? "mt-10" : ""
            }`}
          >
            {items.map((stat) => (
              <div key={stat.label} className="border-l border-navy-600 py-1">
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
