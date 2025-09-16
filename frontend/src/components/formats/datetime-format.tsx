import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function DatetimeFormat({ value }: { value: unknown }) {
  return typeof value === "string" && dayjs(value).isValid() ? (
    <span>{dayjs(value).fromNow()}</span>
  ) : null;
}
