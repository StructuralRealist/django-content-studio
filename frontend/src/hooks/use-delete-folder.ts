import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useHttp } from "@/hooks/use-http.ts";
import type { Id } from "@/types.ts";

export function useDeleteFolder() {
  const http = useHttp();
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: Id) {
      return http.delete(`/media-library/folders/${id}`);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["media-library", "folders"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["media-library", "folder-path"],
      });
    },
  });
}
