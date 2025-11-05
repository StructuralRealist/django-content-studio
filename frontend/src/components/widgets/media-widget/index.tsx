import type { ModelField } from "@/types";

export function MediaWidget({
  field,
  value,
  onChange,
}: {
  field: ModelField;
  onChange(value: any): void;
  value?: any;
}) {
  console.log(field, value);
  return <div>IMAGE</div>;
}
