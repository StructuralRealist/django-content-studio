import bytes from "bytes";

export function FileSizeFormat({ value }: { value: unknown }) {
  return <span>{bytes.format(Number(value))}</span>;
}
