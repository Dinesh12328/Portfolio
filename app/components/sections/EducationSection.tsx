import { Code2, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { educationItems } from "@/app/data/portfolio";

const icons = [GraduationCap, Code2];

export function EducationSection() {
  return (
    <section className="section education-band" aria-labelledby="education-title">
      <div className="section-grid two-column">
        <SectionHeading
          kicker="Education and Practice"
          id="education-title"
          title="Computer Science foundation plus DSA habit."
          compact
        />
        <div className="education-list">
          {educationItems.map((item, index) => {
            const Icon = icons[index] ?? Code2;
            return (
              <div key={item}>
                <Icon aria-hidden="true" size={22} />
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
