import { useQuery } from "@tanstack/react-query";
import * as R from "ramda";

import { useDiscover } from "@/hooks/use-discover";
import { useHttp } from "@/hooks/use-http";

import { Aside } from "./aside";
import { Header } from "./header";
import { Main } from "./main";

export function Editor({
  modelLabel,
  id,
}: {
  modelLabel: string;
  id?: string | null;
}) {
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.models.find(R.whereEq({ label: modelLabel }));

  const { data: resource } = useQuery({
    retry: false,
    queryKey: ["resources", modelLabel, id],
    async queryFn() {
      if (id) {
        const { data } = await http.get(`/content/${modelLabel}/${id}`);
        return data;
      } else {
        return null;
      }
    },
    enabled: !R.isNil(id),
  });

  return (
    model && (
      <div className="flex-1 flex flex-col">
        <Header model={model} resource={resource} />
        <div className="flex gap-8 p-5">
          <div className="flex-1">
            <Main model={model} resource={resource} />
          </div>
          <div className="w-full max-w-[360px]">
            <Aside model={model} resource={resource} />
          </div>
        </div>
      </div>
    )
  );
}
