import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiDotsThreeBold } from "react-icons/pi";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAdminInfo } from "@/hooks/use-admin-info";
import type { DateTimeString, Model, Resource } from "@/types";

export function Header({
  model,
  resource,
  onSave,
  isSaving,
}: {
  model: Model;
  resource?: Resource;
  onSave(): Promise<void>;
  isSaving: boolean;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: info } = useAdminInfo();
  const form = useFormContext();
  const isCreate = !resource?.id;
  const { isDirty } = form.formState;
  const editedAt =
    resource && info
      ? (resource[info.settings.edited_at_attr] as DateTimeString)
      : null;

  return (
    model && (
      <>
        <DialogHeader className="border-b flex-row items-center gap-6 p-5">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="icon"
              disabled={isSaving}
              onClick={(e) => {
                if (isDirty && !confirm(t("editor.unsaved_alert"))) {
                  e.preventDefault();
                }
              }}
            >
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
            {editedAt ? (
              <div className="text-muted-foreground text-sm font-medium mr-4 select-none">
                {`${t("editor.last_edited")} ${dayjs(editedAt).fromNow()}`}
              </div>
            ) : null}
            <Button
              onClick={async () => {
                try {
                  await onSave();
                  navigate({ hash: "" });
                } catch (e) {}
              }}
              isLoading={isSaving}
            >
              {t(isCreate ? "common.create" : "common.save")}
            </Button>
            <Button size="icon" variant="ghost">
              <PiDotsThreeBold />
            </Button>
          </div>
        </DialogHeader>
      </>
    )
  );
}
