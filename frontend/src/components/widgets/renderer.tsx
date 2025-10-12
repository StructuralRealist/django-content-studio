import * as R from "ramda";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SelectWidget } from "@/components/widgets/select-widget.tsx";
import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldType, FieldWidget, type ModelField } from "@/types";

import { RichTextWidget } from "./rich-text-widget";

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
  const widgetClass = R.cond([
    [
      () => field.type === FieldType.CharField && !R.isNil(field.choices),
      R.always(FieldWidget.SelectWidget),
    ],
    [R.T, R.identity],
  ])(field.widget_class ?? info?.widgets[field.type]?.name);

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
      return <RichTextWidget value={value} onChange={onChange} />;
    case FieldWidget.SelectWidget:
      return (
        <SelectWidget
          choices={field.choices}
          value={value}
          onChange={onChange}
        />
      );
    case FieldWidget.CheckboxWidget:
      return <Checkbox checked={value} onCheckedChange={onChange} />;
    default:
      return (
        <Input readOnly value={value ? value.__str__ || String(value) : ""} />
      );
  }
}
