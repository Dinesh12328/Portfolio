import { SectionHeading } from "@/app/components/layout/SectionHeading";
import { ProjectCard } from "@/app/components/ui/ProjectCard";
import { projects } from "@/app/data/portfolio";

export function FeaturedProjects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionHeading
        kicker="Projects"
        id="projects-title"
        title="Spring Boot projects with live demos."
        description="Render demos can take a cold-start moment, but each card includes the live project and the GitHub repository."
      />
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
