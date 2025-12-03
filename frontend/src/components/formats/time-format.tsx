import { PiClockBold } from "react-icons/pi";

export function TimeFormat({ value }: { value: unknown }) {
  return typeof value === "string" ? (
    <span className="text-sm inline-flex items-center gap-1">
      <PiClockBold className="text-slate-500" />
      {value.split(":").slice(0, 2).join(":")}
    </span>
  ) : null;
}
