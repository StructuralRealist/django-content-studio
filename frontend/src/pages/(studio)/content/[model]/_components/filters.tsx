import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import type { Model } from "@/types";

export function Filters({
  model,
  filters,
  onFilterChange,
}: {
  model: Model;
  filters: { search: string };
  onFilterChange(filters: { search: string }): void;
}) {
  const { t } = useTranslation();

  return (
    <div>
      {model.admin.list.search && (
        <Input
          variant="secondary"
          className="w-[260px] max-w-full"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder={t("common.search")}
        />
      )}
    </div>
  );
}
