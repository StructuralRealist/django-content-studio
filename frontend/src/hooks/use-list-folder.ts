import { useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http.ts";
import type { PaginatedResponse } from "@/types.ts";

export function useListFolder({
  parent,
  page,
}: {
  parent: string | null;
  page?: number;
}) {
  const http = useHttp();

  return useQuery({
    retry: false,
    refetchOnWindowFocus: true,
    queryKey: ["media-library", "folders", parent, page],
    async queryFn() {
      const { data } = await http.get<
        PaginatedResponse<{
          id: string;
          name: string;
        }>
      >(`/media-library/folders`, {
        params: {
          parent,
          page,
          limit: 10,
        },
      });
      return data;
    },
  });
}
