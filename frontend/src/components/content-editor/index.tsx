import { useLocation, useNavigate } from "react-router";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Editor } from "./editor";

export function ContentEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, modelLabel, id] = location.hash.split(":");

  return (
    <Sheet
      modal
      open={location.hash.startsWith("#editor:")}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          navigate({ hash: "" });
        }
      }}
    >
      <SheetContent
        className="sm:max-w-none sm:w-[calc(100vw-200px)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Editor modelLabel={modelLabel} id={id} />
      </SheetContent>
    </Sheet>
  );
}
