import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FormatRenderer } from "@/components/formats/renderer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHttp } from "@/hooks/use-http";
import { cn } from "@/lib/utils";
import type { Id, Model, PaginatedResponse, Resource } from "@/types";

import { Editor } from "./editor";

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
  const readOnly = !model.admin;
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
              <Dialog key={resource.id}>
                {!readOnly && (
                  <DialogContent
                    className="p-0 sm:max-w-5xl"
                    showCloseButton={false}
                  >
                    <Editor modelLabel={model.label} id={resource.id} />
                  </DialogContent>
                )}
                <DialogTrigger asChild>
                  <TableRow
                    className={cn({
                      "hover:bg-transparent": readOnly,
                    })}
                  >
                    {adminModel.fields?.map((field) => (
                      <TableCell key={field}>
                        <FormatRenderer
                          value={resource[field]}
                          field={model.fields[field]}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </DialogTrigger>
              </Dialog>
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
