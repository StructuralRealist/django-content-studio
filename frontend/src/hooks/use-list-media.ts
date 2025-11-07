import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as R from "ramda";

import { useDiscover } from "@/hooks/use-discover.ts";
import { useHttp } from "@/hooks/use-http.ts";
import type { PaginatedResponse, Resource } from "@/types.ts";

export function useListMedia({
  folder,
  page,
  filters,
}: {
  folder?: string | null;
  page?: number;
  filters: { search?: string };
}) {
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.media_model;

  return useQuery({
    retry: false,
    enabled: !R.isNil(model),
    queryKey: ["media-library", "items", { folder, page, filters }],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<PaginatedResponse<Resource>>(
        `/media-library/items`,
        {
          params: {
            folder: folder ?? "root",
            search: filters.search,
            page,
          },
        },
      );

      return data;
    },
  });
}
