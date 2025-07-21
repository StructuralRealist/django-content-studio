export function CharField({ value }: { value: unknown }) {
  return <span>{String(value)}</span>;
}
