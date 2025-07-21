import { CgSpinnerTwoAlt } from "react-icons/cg";

import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className="animate-spin inline-flex items-center justify-center">
      <CgSpinnerTwoAlt className={cn("size-5", className)} />
    </div>
  );
}
