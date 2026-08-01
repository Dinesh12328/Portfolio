import {
  Box,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Route,
} from "lucide-react";

type ProjectCardProps = {
  name: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string[];
  live: string;
  repo: string;
  icon: "briefcase" | "brain" | "route" | "box";
};

const iconMap = {
  briefcase: BriefcaseBusiness,
  brain: BrainCircuit,
  route: Route,
  box: Box,
} as const;

export function ProjectCard({
  name,
  role,
  summary,
  impact,
  stack,
  live,
  repo,
  icon,
}: ProjectCardProps) {
  const Icon = iconMap[icon];

  return (
    <article className="project-card">
      <div className="project-topline">
        <span className="project-icon">
          <Icon aria-hidden="true" size={22} />
        </span>
        <div>
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
      </div>
      <p className="project-summary">{summary}</p>
      <ul className="impact-list">
        {impact.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="stack-list" aria-label={`${name} stack`}>
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-actions">
        <a className="button small primary" href={live} target="_blank" rel="noreferrer">
          <ExternalLink aria-hidden="true" size={16} />
          Live Demo
        </a>
        <a className="button small secondary" href={repo} target="_blank" rel="noreferrer">
          <GitBranch aria-hidden="true" size={16} />
          Source
        </a>
      </div>
    </article>
  );
}
