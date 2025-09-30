export function ForeignKeyFormat({ value }: { value: unknown }) {
  // @ts-ignore
  return <span>{value?.__str__ ?? String(value)}</span>;
}
