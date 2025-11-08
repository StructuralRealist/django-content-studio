import * as R from "ramda";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiFolder, PiPlus } from "react-icons/pi";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import { Pagination } from "@/components/ui/pagination.tsx";
import useConfirmDialog from "@/hooks/use-confirm-dialog.ts";
import { useDeleteFolder } from "@/hooks/use-delete-folder.ts";
import { useDiscover } from "@/hooks/use-discover.ts";
import { useFolderPath } from "@/hooks/use-folder-path.ts";
import { useListFolder } from "@/hooks/use-list-folder.ts";
import { cn } from "@/lib/utils.ts";

export function Folders({
  parent,
  onSelect,
}: {
  parent: string | null;
  onSelect?(folder: string | null): void;
}) {
  const { t } = useTranslation();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.folder_model;
  const { mutate: deleteFolder } = useDeleteFolder();
  const [page, setPage] = useState(1);
  const { isFetching, data } = useListFolder({ parent, page });
  const { data: folderPath } = useFolderPath(parent);
  const confirm = useConfirmDialog();

  return (
    <div
      className={cn("rounded border", {
        "animate-pulse": isFetching,
      })}
    >
      <ul className="p-2 space-y-1.5">
        {folderPath && !R.isEmpty(folderPath) && (
          <li className="flex">
            <button
              className="w-full text-left group font-medium text-sm px-4 py-0.5 flex items-center gap-2 hover:bg-accent rounded"
              onClick={() => {
                const parent = folderPath[folderPath.length - 2]?.id ?? null;
                setPage(1);
                onSelect?.(parent);
              }}
            >
              <span className="size-5 bg-accent p-px rounded flex items-center justify-center">
                {".."}
              </span>
            </button>
          </li>
        )}
        {data?.results.map((folder) => (
          <li key={folder.id} className="flex">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <button
                  className="w-full text-left group font-medium text-sm px-4 py-0.5 flex items-center gap-2 hover:bg-accent rounded data-[state=open]:bg-accent"
                  onClick={() => {
                    setPage(1);
                    onSelect?.(folder.id);
                  }}
                >
                  <span className="size-5 bg-blue-50 p-px rounded flex items-center justify-center text-blue-500">
                    <PiFolder size={14} />
                  </span>
                  <span>{folder.name}</span>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className="text-destructive"
                  onSelect={async () => {
                    const confirmed = await confirm({
                      title: t("common.delete_confirm_title"),
                      description: t("common.delete_confirm_description"),
                    });
                    if (confirmed) {
                      deleteFolder(folder.id);
                    }
                  }}
                >
                  {t("common.delete")}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </li>
        ))}
      </ul>

      {data && (
        <div className="p-2 border-t empty:hidden">
          <Pagination
            pages={data.pagination.pages}
            current={page}
            onPageChange={setPage}
          />
        </div>
      )}

      {model?.admin?.permissions.add_permission && (
        <div className="font-medium text-sm border-t border-dashed px-4 py-2">
          <div>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-secondary-foreground">
              <PiPlus className="mr-1" />
              <span>{t("media_library.new_folder")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
