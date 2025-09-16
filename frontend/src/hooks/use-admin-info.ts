import { useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http";
import type { AdminInfo } from "@/types";

export function useAdminInfo() {
  const http = useHttp();

  return useQuery({
    retry: false,
    queryKey: ["admin-info"],
    async queryFn() {
      const { data } = await http.get<AdminInfo>("/info");

      return data;
    },
  });
}
