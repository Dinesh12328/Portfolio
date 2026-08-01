import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { ProcessStep } from "@/app/components/ui/ProcessStep";
import { processSteps } from "@/app/data/portfolio";

export function ProcessSection() {
  return (
    <section className="section process-band" id="process" aria-labelledby="process-title">
      <SectionHeading
        kicker="How I Work"
        id="process-title"
        title="Practical backend habits."
        description="I keep backend projects focused on clear API design, secure flows, persistence, service boundaries, deployment readiness, and maintainable structure."
      />
      <div className="process-grid">
        {processSteps.map((item) => (
          <ProcessStep key={item.step} {...item} />
        ))}
      </div>
    </section>
  );
}
