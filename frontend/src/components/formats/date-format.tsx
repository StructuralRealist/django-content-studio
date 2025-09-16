import dayjs from "dayjs";

export function DateFormat({ value }: { value: unknown }) {
  return typeof value === "string" && dayjs(value).isValid() ? (
    <span>{dayjs(value).format("D MMM YYYY")}</span>
  ) : null;
}
