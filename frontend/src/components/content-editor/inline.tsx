import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FormatRenderer } from "@/components/formats/renderer.tsx";
import { Pagination } from "@/components/ui/pagination.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHttp } from "@/hooks/use-http";
import type { Id, Model, PaginatedResponse, Resource } from "@/types";

export function Inline({
  relId,
  model,
  adminModel,
}: {
  // Related resource id
  relId: Id;
  // Inline model
  model: Model;
  // Inline admin model
  adminModel: { fk_name: string; fields: string[] | null };
}) {
  const http = useHttp();
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    retry: false,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
    queryKey: ["resources", model.label, adminModel.fk_name, relId, page],
    async queryFn() {
      const { data } = await http.get<PaginatedResponse<Resource>>(
        `/content/${model.label}`,
        {
          params: { [`${adminModel.fk_name}_id`]: relId, page },
        },
      );

      return data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {adminModel.fields?.map((field) => (
                <TableHead key={field}>
                  {model.fields[field]?.verbose_name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results.map((resource) => (
              <TableRow key={resource.id}>
                {adminModel.fields?.map((field) => (
                  <TableCell key={field}>
                    <FormatRenderer
                      value={resource[field]}
                      field={model.fields[field]}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data?.pagination && (
        <div className="flex justify-center">
          <Pagination
            current={data.pagination.current}
            pages={data.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
