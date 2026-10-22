interface Props {
  index: string;
  children: React.ReactNode;
}

export function SectionLabel({ index, children }: Props) {
  return (
    <p className="section-label">
      <span className="section-label__index">{index}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
