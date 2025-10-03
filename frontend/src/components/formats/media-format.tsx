export function MediaFormat({ value }: { value: unknown }) {
  return value ? (
    // @ts-ignore
    <img src={value.__str__} className="size-8 rounded" alt="" />
  ) : null;
}
