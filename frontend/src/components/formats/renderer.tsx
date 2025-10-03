import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldFormat, type ModelField } from "@/types";

import { BooleanFormat } from "./boolean-format";
import { DateFormat } from "./date-format";
import { DatetimeFormat } from "./datetime-format";
import { FileSizeFormat } from "./file-size-format";
import { ForeignKeyFormat } from "./foreign-key-format";
import { MediaFormat } from "./media-format";
import { TextFormat } from "./text-format";
import { TimeFormat } from "./time-format";

export function FormatRenderer({
  value,
  field,
}: {
  value: unknown;
  field: ModelField;
}) {
  const { data: info } = useAdminInfo();
  const formatClass = field.format_class ?? info?.formats[field.type]?.name;

  switch (formatClass) {
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
    case FieldFormat.MediaFormat:
      return <MediaFormat value={value} />;
    default:
      return <TextFormat value={value} />;
  }
}
