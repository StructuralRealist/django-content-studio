import { PiFileBold } from "react-icons/pi";
import { useNavigate } from "react-router";

import { useDiscover } from "@/hooks/use-discover";

export function GridView({
  items,
}: {
  items: { id: number | string; [p: string]: unknown }[];
}) {
  const { data: discover } = useDiscover();
  const navigate = useNavigate();
  const model = discover?.media_library.models.media_model;

  return (
    model && (
      <div className="grid grid-cols-4 gap-4">
        {items.map((item: any) => (
          <button
            key={item.id}
            className="border rounded p-4"
            onClick={() => navigate({ hash: `ml:item:${item.id}` })}
          >
            {item.type === "image" ? (
              <img
                src={item.file}
                className="rounded aspect-square object-cover"
              />
            ) : (
              <div className="rounded aspect-square w-full bg-gray-200 items-center justify-center flex">
                <PiFileBold className="size-5 text-gray-400" />
              </div>
            )}
            <div className="pt-2 text-sm font-semibold">{item.name}</div>
          </button>
        ))}
      </div>
    )
  );
}
