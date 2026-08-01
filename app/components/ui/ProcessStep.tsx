type ProcessStepProps = {
  step: string;
  title: string;
  description: string;
};

export function ProcessStep({ step, title, description }: ProcessStepProps) {
  return (
    <article className="process-step">
      <p className="process-index">{step}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
