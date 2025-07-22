import { PiCheckBold, PiXBold } from "react-icons/pi";

import { cn } from "@/lib/utils";

export function BooleanField({ value }: { value: unknown }) {
  return (
    <div
      className={cn(
        "size-4 rounded-full flex items-center justify-center text-xs",
        value ? "bg-emerald-100 text-emerald-500" : "bg-rose-100 text-rose-500",
      )}
    >
      {value ? <PiCheckBold /> : <PiXBold />}
    </div>
  );
}
