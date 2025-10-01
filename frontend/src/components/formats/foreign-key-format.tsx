export function ForeignKeyFormat({ value }: { value: unknown }) {
  // @ts-ignore
  return <span>{value ? (value.__str__ ?? String(value)) : "-"}</span>;
}
