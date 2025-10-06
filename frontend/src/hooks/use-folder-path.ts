import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http.ts";
import type { Id } from "@/types.ts";

export function useFolderPath(folder: Id | null) {
  const http = useHttp();

  return useQuery({
    retry: false,
    refetchOnWindowFocus: true,
    queryKey: ["media-library", "folder-path", folder],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<{ name: string; id: string }[]>(
        `/media-library/folders/path`,
        {
          params: {
            folder,
          },
        },
      );

      return data;
    },
  });
}
