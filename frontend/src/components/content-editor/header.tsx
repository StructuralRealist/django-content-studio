import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiDotsThreeBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Model } from "@/types";

export function Header({ model, resource }: { model: Model; resource?: any }) {
  const { t } = useTranslation();
  const isCreate = !resource?.id;

  return (
    model && (
      <>
        <SheetHeader className="border-b flex-row items-center gap-6">
          <SheetClose asChild>
            <Button variant="outline" size="icon">
              <PiArrowLeft />
            </Button>
          </SheetClose>
          <div className="select-none">
            <SheetTitle>
              {`${t(isCreate ? "editor.title_create" : "editor.title_edit", { modelName: model.verbose_name.toLowerCase() })}`}
            </SheetTitle>
            <div className="text-sm font-medium text-muted-foreground">
              {resource?.__str__}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2">
            <Button>{t(isCreate ? "common.create" : "common.save")}</Button>
            <Button size="icon" variant="ghost">
              <PiDotsThreeBold />
            </Button>
          </div>
        </SheetHeader>
      </>
    )
  );
}
