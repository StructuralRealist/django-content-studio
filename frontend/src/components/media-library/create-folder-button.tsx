import { useTranslation } from "react-i18next";
import { PiFolder } from "react-icons/pi";

import { ContentForm } from "@/components/content-form.tsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateFolder } from "@/hooks/use-create-folder";
import { useDiscover } from "@/hooks/use-discover";

export function CreateFolderButton({ parent }: { parent: string | null }) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PiFolder />
          {t("media-library.new_folder")}
        </Button>
      </DialogTrigger>
      <CreateFolderDialog parent={parent} />
    </Dialog>
  );
}

function CreateFolderDialog({ parent }: { parent: string | null }) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useCreateFolder();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.folder_model;

  return (
    model && (
      <ContentForm model={model}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("media-library.new_folder")}</DialogTitle>
          </DialogHeader>
          <div></div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="link">{t("common.cancel")}</Button>
            </DialogClose>
            <Button>{t("common.create")}</Button>
          </DialogFooter>
        </DialogContent>
      </ContentForm>
    )
  );
}
