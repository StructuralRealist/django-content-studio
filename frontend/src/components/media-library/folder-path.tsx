import { PiHouseBold } from "react-icons/pi";

import { useFolderPath } from "@/hooks/use-folder-path.ts";
import { cn } from "@/lib/utils.ts";

export function FolderPath({
  folder,
  onSelect,
}: {
  folder: string | null;
  onSelect?(folder: string | null): void;
}) {
  const { isFetching, data } = useFolderPath(folder);

  return (
    <div>
      <div
        className={cn("rounded-md mb-6 bg-white", {
          "animate-pulse": isFetching,
        })}
      >
        <ul className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <li className="flex">
            <button onClick={() => onSelect?.(null)}>
              <PiHouseBold />
            </button>
          </li>
          {data?.map((folder) => (
            <li key={folder.id} className="flex items-center gap-2">
              <span className="select-none">{"/"}</span>
              <button
                className="hover:underline"
                onClick={() => onSelect?.(folder.id)}
              >
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
