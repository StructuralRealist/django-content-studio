import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ModelField } from "@/types";

export function SelectWidget({
  field,
  value,
  onChange,
}: {
  field: ModelField;
  onChange(value: any): void;
  value?: any;
}) {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange?.(value === "NULL" ? null : value)}
    >
      <SelectTrigger className="w-auto">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {field.choices?.map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
        {!field.required && value && (
          <>
            <SelectSeparator />
            <SelectItem value="NULL">{t("common.clear")}</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}
