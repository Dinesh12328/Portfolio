type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  compact?: boolean;
  id?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  compact,
  id,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading${compact ? " compact" : ""}`}>
      <p className="section-kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
