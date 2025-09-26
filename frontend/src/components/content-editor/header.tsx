import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiDotsThreeBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAdminInfo } from "@/hooks/use-admin-info";
import type { Model } from "@/types";

export function Header({ model, resource }: { model: Model; resource?: any }) {
  const { t } = useTranslation();
  const { data: info } = useAdminInfo();
  const isCreate = !resource?.id;
  const editedAt =
    resource && info ? resource[info.settings.edited_at_attr] : null;

  return (
    model && (
      <>
        <DialogHeader className="border-b flex-row items-center gap-6 p-5">
          <DialogClose asChild>
            <Button variant="outline" size="icon">
              <PiArrowLeft />
            </Button>
          </DialogClose>
          <div className="select-none">
            <DialogTitle>
              {`${t(isCreate ? "editor.title_create" : "editor.title_edit", { modelName: model.verbose_name.toLowerCase() })}`}
            </DialogTitle>
            <div className="text-sm font-medium text-muted-foreground">
              {resource?.__str__}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2">
            {editedAt && (
              <div className="text-muted-foreground text-sm font-medium mr-4 select-none">
                {`${t("editor.last_edited")} ${dayjs(editedAt).fromNow()}`}
              </div>
            )}
            <Button>{t(isCreate ? "common.create" : "common.save")}</Button>
            <Button size="icon" variant="ghost">
              <PiDotsThreeBold />
            </Button>
          </div>
        </DialogHeader>
      </>
    )
  );
}
