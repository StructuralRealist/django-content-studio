import { useTranslation } from "react-i18next";
import { PiFileBold } from "react-icons/pi";
import { toast } from "sonner";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useConfirmDialog from "@/hooks/use-confirm-dialog.ts";
import { useDeleteMedia } from "@/hooks/use-delete-media";
import { cn, getErrorMessage } from "@/lib/utils";

export function ItemCard({
  item,
  className,
  children,
  ...props
}: {
  item: any;
} & React.ComponentProps<"button">) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeleteMedia();
  const confirm = useConfirmDialog();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild key={item.id}>
        <button
          {...props}
          className={cn(
            "border rounded p-4 data-[state=open]:border-ring flex flex-col",
            {
              "animate-pulse pointer-events-none select-none": isPending,
            },
            className,
          )}
        >
          {children}
          {item.type === "image" ? (
            <img
              src={item.thumbnail}
              className="rounded aspect-square object-cover"
            />
          ) : (
            <div className="rounded aspect-square w-full bg-slate-200 items-center justify-center flex">
              <PiFileBold className="size-5 text-slate-400" />
            </div>
          )}
          <div className="pt-2 text-sm font-semibold">{item.name}</div>
        </button>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onSelect={() => null}>
          {t("common.edit")}
        </ContextMenuItem>
        <ContextMenuItem
          className="text-destructive"
          onSelect={async () => {
            const confirmed = await confirm({
              title: t("common.delete_confirm_title"),
              description: t("common.delete_confirm_description"),
            });

            if (!confirmed) {
              return;
            }

            const id = toast.loading(t("common.deleting"));

            try {
              await mutateAsync(item.id);
              toast.success(t("common.deleted"), { id });
            } catch (e: any) {
              toast.error(getErrorMessage(e), { id });
            }
          }}
        >
          {t("common.delete")}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
