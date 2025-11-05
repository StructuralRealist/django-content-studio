export function FileFormat({ value, ...props }: { value: unknown }) {
  return value ? <div className="size-5 rounded bg-stone-100" /> : null;
}
