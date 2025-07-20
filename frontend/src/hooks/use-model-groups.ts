import { useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http";

export function useModelGroups() {
  const http = useHttp();

  return useQuery({
    queryKey: ["model-groups"],
    async queryFn() {
      const { data } = await http.get<any>("/model_groups");

      return data;
    },
  });
}
