import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldWidget, type ModelField } from "@/types";

import { RichTextField } from "./rich-text";

export function WidgetRenderer({
  value,
  onChange,
  field,
  ...props
}: {
  value: any;
  onChange(value: any): void;
  field: ModelField;
}) {
  const { data: info } = useAdminInfo();
  const widgetClass = field.widget_class ?? info?.widgets[field.type]?.name;

  switch (widgetClass) {
    case FieldWidget.InputWidget:
    case FieldWidget.URLPathWidget:
      return (
        <Input
          {...props}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case FieldWidget.RichTextWidget:
      return <RichTextField value={value} onChange={onChange} />;
    case FieldWidget.CheckboxWidget:
      return <Checkbox checked={value} onCheckedChange={onChange} />;
    default:
      return (
        <Input readOnly value={value ? value.__str__ || String(value) : ""} />
      );
  }
}
