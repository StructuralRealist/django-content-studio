import { DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useDiscover } from "@/hooks/use-discover";

export function CreateFolderButton({ parent }: { parent: string | null }) {
  const { t } = useTranslation();
  const { data: discover } = useDiscover();
  const modelLabel = discover?.media_library.models.folder_model;

  return modelLabel ? (
    <DialogTrigger asChild>
      <Button variant="outline">{t("media-library.new_folder")}</Button>
    </DialogTrigger>
  ) : null;
}
