import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import type { Model, Resource } from "@/types";

export function ContentForm({
  model,
  children,
}: {
  model: Model;
  children: React.ReactNode;
}) {
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

  return model && <Form {...form}>{children}</Form>;
}
