import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as R from "ramda";

import { useDiscover } from "@/hooks/use-discover.ts";
import { useHttp } from "@/hooks/use-http.ts";
import type { MediaItem } from "@/types.ts";

export function useRetrieveMedia(id: string) {
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.media_model;

  return useQuery({
    retry: false,
    enabled: !R.isNil(model),
    queryKey: ["media-library", "items", id],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<MediaItem>(`/media-library/items/${id}`);

      return data;
    },
  });
}
