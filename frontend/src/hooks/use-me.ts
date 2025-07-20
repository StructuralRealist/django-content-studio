import { useQuery } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http";
import type { SessionUser } from "@/types";

export function useMe() {
  const http = useHttp();

  return useQuery({
    queryKey: ["me"],
    async queryFn() {
      const { data } = await http.get<SessionUser>("/me");

      return data;
    },
  });
}
