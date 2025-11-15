import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as R from "ramda";
import { useState } from "react";

import { MultiSelect } from "@/components/ui/multi-select";
import { useHttp } from "@/hooks/use-http";
import type { ModelField, PaginatedResponse, Resource } from "@/types";

export function ManyToManyWidget({
  field,
  value = [],
  onChange,
}: {
  field: ModelField;
  onChange?: any;
  value?: any;
}) {
  const http = useHttp();
  const [search, setSearch] = useState("");
  const relatedModel = field.related_model;
  const { data } = useQuery({
    enabled: !R.isNil(relatedModel),
    queryKey: ["related-model", relatedModel, search],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<PaginatedResponse<Resource>>(
        `/content/${relatedModel}`,
        { params: { search } },
      );

      return data;
    },
  });

  return (
    <MultiSelect
      inputProps={{ onValueChange: setSearch }}
      commandProps={{ shouldFilter: false }}
      options={
        data?.results.map(({ id, __str__ }) => ({
          label: __str__,
          value: id,
        })) ?? []
      }
      value={value.map(({ id, __str__ }: any) => ({
        value: id,
        label: __str__,
      }))}
      onChange={(options) =>
        onChange(
          options.map(({ value, label }) => ({ id: value, __str__: label })),
        )
      }
    />
  );
}
