import { Code2, ContactRound, GitBranch, TerminalSquare } from "lucide-react";
import { heroStats } from "@/app/data/portfolio";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { PremiumOrbitScene } from "@/app/components/ui/PremiumOrbitScene";
import { StatCard } from "@/app/components/ui/StatCard";

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <PremiumOrbitScene />
      <div className="hero-shell">
        <SiteHeader />
        <div className="hero-content">
          <p className="eyebrow">
            <TerminalSquare aria-hidden="true" size={18} />
            Java Backend Developer
          </p>
          <h1 id="hero-title">Dinesh Pyla</h1>
          <p className="hero-copy">
            Building secure, scalable, production-ready Java backend systems with
            Spring Boot, REST APIs, JWT security, persistence, microservices,
            and deployment-ready architecture.
          </p>
          <div className="hero-actions" aria-label="Primary links">
            <a className="button primary" href="#projects">
              <Code2 aria-hidden="true" size={18} />
              View Case Studies
            </a>
            <a
              className="button secondary"
              href="https://github.com/Dinesh12328"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch aria-hidden="true" size={18} />
              GitHub
            </a>
            <a
              className="button secondary"
              href="https://www.linkedin.com/in/dinesh-pyla-a64a45322/"
              target="_blank"
              rel="noreferrer"
            >
              <ContactRound aria-hidden="true" size={18} />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Profile proof points">
          {heroStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
