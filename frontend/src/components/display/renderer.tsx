import { FieldType, type ModelField } from "@/types";

import { CharField } from "./char-field";
import { DateField } from "./date-field";
import { DateTimeField } from "./datetime-field";

export function DisplayRenderer({
  value,
  field,
}: {
  value: unknown;
  field: ModelField;
}) {
  switch (field.type) {
    case FieldType.DateField:
      return typeof value === "string" ? <DateField value={value} /> : null;
    case FieldType.DateTimeField:
      return typeof value === "string" ? <DateTimeField value={value} /> : null;
    default:
      return <CharField value={value} />;
  }
}
