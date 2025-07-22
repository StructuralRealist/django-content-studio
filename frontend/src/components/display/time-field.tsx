export function TimeField({ value }: { value: unknown }) {
  return typeof value === "string" ? (
    <span>{value.split(":").slice(0, 2).join(":")}</span>
  ) : null;
}
