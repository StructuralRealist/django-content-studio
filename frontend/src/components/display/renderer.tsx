import { FieldType, type ModelField } from "@/types";

import { BooleanField } from "./boolean-field";
import { CharField } from "./char-field";
import { DateField } from "./date-field";
import { DateTimeField } from "./datetime-field";
import { TimeField } from "./time-field";

export function DisplayRenderer({
  value,
  field,
}: {
  value: unknown;
  field: ModelField;
}) {
  switch (field.type) {
    case FieldType.BooleanField:
      return <BooleanField value={value} />;
    case FieldType.TimeField:
      return <TimeField value={value} />;
    case FieldType.DateField:
      return <DateField value={value} />;
    case FieldType.DateTimeField:
      return <DateTimeField value={value} />;
    default:
      return <CharField value={value} />;
  }
}
