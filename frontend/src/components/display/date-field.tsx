import dayjs from "dayjs";

export function DateField({ value }: { value: string }) {
  return <span>{dayjs(value).format("D MMM YYYY")}</span>;
}
