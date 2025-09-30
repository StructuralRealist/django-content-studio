import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as R from "ramda";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useDiscover } from "@/hooks/use-discover";
import { useHttp } from "@/hooks/use-http";
import type { Resource } from "@/types";

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
  const queryClient = useQueryClient();
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.models.find(R.whereEq({ label: modelLabel }));
  const formSchema = z.looseObject({
    id: z.string().readonly(),
    __str__: z.string().readonly(),
  });
  const form = useForm<Resource>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: Object.entries(model?.fields ?? {}).reduce(
      (defaults, [key, field]) => ({ ...defaults, [key]: field.default }),
      {},
    ),
  });

  const { data: resource } = useQuery({
    enabled: !R.isNil(id),
    retry: false,
    queryKey: ["resources", modelLabel, id],
    async queryFn() {
      const { data } = await http.get(`/content/${modelLabel}/${id}`);
      form.reset(data);

      return data;
    },
  });

  const { mutate: save } = useMutation({
    async mutationFn(values: Resource) {
      await http[id ? "put" : "post"](
        `/content/${modelLabel}${id ? `/${id}` : ""}`,
        values,
      );
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["resources", modelLabel],
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    save(values);
  }

  return (
    model && (
      <Form {...form}>
        <div className="flex-1 flex flex-col">
          <Header
            model={model}
            resource={resource}
            onSave={() => form.handleSubmit(onSubmit)()}
          />
          <div className="flex gap-8 p-5">
            <div className="flex-1">
              <Main model={model} />
            </div>
            <div className="w-full max-w-[360px]">
              <Aside model={model} />
            </div>
          </div>
        </div>
      </Form>
    )
  );
}
