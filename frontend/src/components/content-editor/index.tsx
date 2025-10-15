import { useLocation, useNavigate } from "react-router";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Editor } from "./editor";

export function ContentEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, modelLabel, id] = location.hash.split(":");

  return (
    <Dialog
      open={location.hash.startsWith("#editor:")}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          navigate({ hash: "" });
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-none w-screen h-screen rounded-none p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Editor modelLabel={modelLabel} id={id} />
      </DialogContent>
    </Dialog>
  );
}
