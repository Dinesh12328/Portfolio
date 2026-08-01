import { AboutSection } from "@/app/components/sections/AboutSection";
import { ContactSection } from "@/app/components/sections/ContactSection";
import { EducationSection } from "@/app/components/sections/EducationSection";
import { FeaturedProjects } from "@/app/components/sections/FeaturedProjects";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { MetricsSection } from "@/app/components/sections/MetricsSection";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { SkillsSection } from "@/app/components/sections/SkillsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
      <SkillsSection />
      <ProcessSection />
      <MetricsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
