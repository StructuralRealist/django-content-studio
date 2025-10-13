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
  const isSingleton = model?.admin.is_singleton ?? false;
  const formSchema = z.looseObject({
    id: z.string().readonly().optional(),
    __str__: z.string().readonly().optional(),
  });
  const form = useForm<Partial<Resource>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: Object.entries(model?.fields ?? {}).reduce(
      (defaults, [key, field]) => ({ ...defaults, [key]: field.default }),
      {},
    ),
  });

  const { data: resource } = useQuery({
    enabled: !R.isNil(id) || isSingleton,
    retry: false,
    queryKey: ["resources", modelLabel, id || isSingleton],
    async queryFn() {
      const { data } = await http.get(
        `/content/${modelLabel}${isSingleton ? "" : `/${id}`}`,
      );
      form.reset(data);

      return data;
    },
  });

  const { mutateAsync: save, isPending } = useMutation({
    async mutationFn(values: Partial<Resource>) {
      await http[values.id ? "put" : "post"](
        `/content/${modelLabel}${values.id ? `/${values.id}` : ""}`,
        values,
      );
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["resources", modelLabel],
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await save(values);
  }

  return (
    model && (
      <Form {...form}>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            model={model}
            resource={resource}
            isSaving={isPending}
            onSave={() => form.handleSubmit(onSubmit)()}
          />
          <div className="flex flex-1 justify-center overflow-y-auto">
            <div className="w-full max-w-3xl">
              <div className="p-5">
                <Main model={model} id={id} />
              </div>
            </div>
            <div className="w-full max-w-[360px]">
              <div className="p-5">
                <Aside model={model} />
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  );
}
