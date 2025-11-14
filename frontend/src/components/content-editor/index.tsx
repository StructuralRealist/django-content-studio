import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Editor } from "./editor";

export function ContentEditorDialog({
  modelLabel,
  id,
  children,
  className,
}: {
  modelLabel: string;
  id?: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      {children}
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={cn(
          "sm:max-w-none w-screen h-screen rounded-none p-0",
          className,
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Editor modelLabel={modelLabel} id={id} />
      </DialogContent>
    </Dialog>
  );
}
