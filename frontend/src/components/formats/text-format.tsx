export function TextFormat({ value }: { value: unknown }) {
  return <span>{String(value)}</span>;
}
