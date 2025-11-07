import { useTranslation } from "react-i18next";
import { PiFileBold } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDeleteMedia } from "@/hooks/use-delete-media.ts";
import { useDiscover } from "@/hooks/use-discover";
import { cn, getErrorMessage } from "@/lib/utils.ts";

export function GridView({
  items,
}: {
  items: { id: number | string; [p: string]: unknown }[];
}) {
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.media_model;

  return (
    model && (
      <div className="grid grid-cols-4 gap-4">
        {items.map((item: any) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    )
  );
}

function ItemCard({ item }: { item: any }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteMedia();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild key={item.id}>
        <button
          onClick={() => navigate({ hash: `ml:item:${item.id}` })}
          className={cn("border rounded p-4 data-[state=open]:border-ring", {
            "animate-pulse pointer-events-none select-none": isPending,
          })}
        >
          {item.type === "image" ? (
            <img
              src={item.thumbnail}
              className="rounded aspect-square object-cover"
            />
          ) : (
            <div className="rounded aspect-square w-full bg-gray-200 items-center justify-center flex">
              <PiFileBold className="size-5 text-gray-400" />
            </div>
          )}
          <div className="pt-2 text-sm font-semibold">{item.name}</div>
        </button>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          onSelect={() => navigate({ hash: `ml:item:${item.id}` })}
        >
          {t("common.edit")}
        </ContextMenuItem>
        <ContextMenuItem
          className="text-destructive"
          onSelect={async () => {
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
