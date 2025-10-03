import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as R from "ramda";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiGridNineBold, PiImageBold, PiListBulletsBold } from "react-icons/pi";
import { useSearchParams } from "react-router";

import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useDiscover } from "@/hooks/use-discover";
import { useHttp } from "@/hooks/use-http";
import type { PaginatedResponse, Resource } from "@/types";

import { Filters } from "./_components/filters";
import { ListView } from "./_components/list-view";

export function MediaLibraryPage() {
  const { t } = useTranslation();
  const http = useHttp();
  const { data: discover } = useDiscover();
  const model = discover?.media_library.models.media_model;
  const [view, setView] = useState<"list" | "grid">("list");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const [filters, setFilters] = useState<{ search: string }>({
    search: "",
  });
  const { data } = useQuery({
    retry: false,
    enabled: !R.isNil(model),
    queryKey: ["media-library", filters, page],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { data } = await http.get<PaginatedResponse<Resource>>(
        `/media-library`,
        {
          params: {
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

      <div className="flex items-center justify-between mb-8">
        <Filters filters={filters} onFilterChange={setFilters} />

        <ToggleGroup
          type="single"
          variant="outline"
          value={view}
          onValueChange={(v: "list" | "grid") => setView(v)}
        >
          <ToggleGroupItem value="list">
            <PiListBulletsBold />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid">
            <PiGridNineBold />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {view === "list" ? <ListView items={data.results} /> : null}
      <div className="py-6">
        <Pagination
          current={data.pagination.current}
          pages={data.pagination.pages}
        />
      </div>
    </div>
  ) : (
    <div className="flex-1 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
