import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as R from "ramda";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiImageBold } from "react-icons/pi";
import { useSearchParams } from "react-router";

import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { useDiscover } from "@/hooks/use-discover";
import { useHttp } from "@/hooks/use-http";
import type { PaginatedResponse, Resource } from "@/types";

import { Filters } from "./_components/filters";
import { FolderPath } from "./_components/folder-path";
import { Folders } from "./_components/folders";
import { GridView } from "./_components/grid-view";

export function MediaLibraryPage() {
  const { t } = useTranslation();
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.media_model;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const folder = searchParams.get("folder");
  const [filters, setFilters] = useState<{ search: string }>({
    search: "",
  });
  const { data } = useQuery({
    retry: false,
    enabled: !R.isNil(model),
    queryKey: ["media-library", { folder, page, filters }],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<PaginatedResponse<Resource>>(
        `/media-library/items`,
        {
          params: {
            folder: folder ?? "root",
            search: filters.search,
            page,
          },
        },
      );

      return data;
    },
  });

  return model && data ? (
    <div className="p-5">
      <div className="flex items-center gap-4 mb-8">
        <PiImageBold />
        <div>
          <h1 className="text-xl/tight font-semibold">
            {t("media-library.title")}
          </h1>
          <div className="text-muted-foreground">
            {t("media-library.description")}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Filters filters={filters} onFilterChange={setFilters} />
      </div>

      {discover.media_library.folders && (
        <FolderPath
          folder={folder}
          onSelect={(folder) =>
            setSearchParams((searchParams) => {
              if (folder) {
                searchParams.set("folder", folder);
              } else {
                searchParams.delete("folder");
              }
              return searchParams;
            })
          }
        />
      )}

      {discover.media_library.folders && (
        <div className="mb-4">
          <Folders
            parent={folder}
            onSelect={(folder) =>
              setSearchParams((searchParams) => {
                if (folder) {
                  searchParams.set("folder", folder);
                } else {
                  searchParams.delete("folder");
                }
                return searchParams;
              })
            }
          />
        </div>
      )}

      <GridView items={data.results} />

      <div className="py-6">
        <Pagination
          current={data.pagination.current}
          pages={data.pagination.pages}
          onPageChange={(page) =>
            setSearchParams((searchParams) => {
              searchParams.set("page", `${page}`);
              return searchParams;
            })
          }
        />
      </div>
    </div>
  ) : (
    <div className="flex-1 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
