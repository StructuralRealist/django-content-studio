import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function DateTimeField({ value }: { value: string }) {
  return <span>{dayjs(value).fromNow()}</span>;
}
