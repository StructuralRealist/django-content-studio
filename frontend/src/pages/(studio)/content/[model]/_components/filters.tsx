import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";

export function Filters({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange(filters: Record<string, any>): void;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        variant="secondary"
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        placeholder={t("common.search")}
      />
    </div>
  );
}
