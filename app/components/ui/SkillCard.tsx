import { Database, Layers3, ServerCog, TestTube2 } from "lucide-react";

const iconMap = {
  server: ServerCog,
  layers: Layers3,
  database: Database,
  test: TestTube2,
} as const;

type SkillCardProps = {
  title: string;
  description: string;
  skills: string[];
  icon: keyof typeof iconMap;
};

export function SkillCard({ title, description, skills, icon }: SkillCardProps) {
  const Icon = iconMap[icon];

  return (
    <article className="skill-card">
      <div className="skill-title">
        <Icon aria-hidden="true" size={22} />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <div className="stack-list">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </article>
  );
}
