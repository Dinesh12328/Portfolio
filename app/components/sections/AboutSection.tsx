import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { aboutParagraphs } from "@/app/data/portfolio";

export function AboutSection() {
  return (
    <section className="section intro-band" id="about" aria-labelledby="about-title">
      <div className="section-grid two-column">
        <SectionHeading
          kicker="Profile"
          id="about-title"
          title="Java, Spring Boot, APIs, and backend systems."
          compact
        />
        <div className="about-copy">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="lead">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
