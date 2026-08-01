import { ArrowUpRight, ContactRound, GitBranch, Mail } from "lucide-react";
import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { contactLinks } from "@/app/data/portfolio";

const iconMap = {
  mail: Mail,
  github: GitBranch,
  linkedin: ContactRound,
  arrow: ArrowUpRight,
} as const;

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <SectionHeading
          kicker="Contact"
          id="contact-title"
          title="Let&apos;s connect."
          description="Open to backend opportunities, collaboration, and interesting product work."
          compact
        />
        <div className="contact-actions">
          {contactLinks.map((link, index) => {
            const Icon = iconMap[link.icon];
            const isPrimary = index === 0;
            const external = !link.href.startsWith("mailto:");
            return (
              <a
                key={link.label}
                className={`button ${isPrimary ? "primary" : "secondary"}`}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <Icon aria-hidden="true" size={18} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
