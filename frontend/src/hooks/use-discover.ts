import { useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http";
import type { Model, ModelGroup } from "@/types";

export function useDiscover() {
  const http = useHttp();

  return useQuery({
    retry: false,
    staleTime: Infinity,
    queryKey: ["model-groups"],
    async queryFn() {
      const { data } = await http.get<{
        model_groups: ModelGroup[];
        models: Model[];
        media_library: {
          enabled: boolean;
          folders: boolean;
          models: {
            media_model: Model | null;
            folder_model: Model | null;
          };
        };
      }>("/discover");

      return data;
    },
  });
}
