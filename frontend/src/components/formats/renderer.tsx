import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldFormat, type ModelField } from "@/types";

import { BooleanFormat } from "./boolean-format";
import { DateFormat } from "./date-format";
import { DatetimeFormat } from "./datetime-format";
import { FileSizeFormat } from "./file-size-format";
import { ForeignKeyFormat } from "./foreign-key-format";
import { TextFormat } from "./text-format";
import { TimeFormat } from "./time-format";

export function FormatRenderer({
  value,
  field,
  format,
}: {
  value: unknown;
  field: ModelField;
  format?: FieldFormat;
}) {
  const { data: info } = useAdminInfo();
  const frmt = format ?? field.format ?? info?.formats[field.type]?.name;

  switch (frmt) {
    case FieldFormat.FileSizeFormat:
      return <FileSizeFormat value={value} />;
    case FieldFormat.BooleanFormat:
      return <BooleanFormat value={value} />;
    case FieldFormat.TimeFormat:
      return <TimeFormat value={value} />;
    case FieldFormat.DateFormat:
      return <DateFormat value={value} />;
    case FieldFormat.DateTimeFormat:
      return <DatetimeFormat value={value} />;
    case FieldFormat.ForeignKeyFormat:
      return <ForeignKeyFormat value={value} />;
    default:
      return <TextFormat value={value} />;
  }
}
