import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { SkillCard } from "@/app/components/ui/SkillCard";
import { skillGroups } from "@/app/data/portfolio";

export function SkillsSection() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        kicker="Technical Stack"
        id="skills-title"
        title="Java backend stack."
        description="Technologies I use across Java backend, API, and Spring Boot development."
      />
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <SkillCard key={group.title} {...group} />
        ))}
      </div>
    </section>
  );
}
