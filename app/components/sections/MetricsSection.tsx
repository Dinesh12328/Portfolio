import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { StatCard } from "@/app/components/ui/StatCard";
import { metrics } from "@/app/data/portfolio";

export function MetricsSection() {
  return (
    <section className="section metrics-band" aria-labelledby="metrics-title">
      <SectionHeading
        kicker="Impact"
        id="metrics-title"
        title="Backend outcomes at a glance."
        compact
      />
      <div className="metrics-grid" aria-label="Backend metrics">
        {metrics.map((item) => (
          <StatCard key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  );
}
