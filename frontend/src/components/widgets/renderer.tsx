import { Input } from "@/components/ui/input";
import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldWidget, type ModelField } from "@/types";

export function WidgetRenderer({
  value,
  onChange,
  field,
  widget,
}: {
  value: any;
  onChange(value: any): void;
  field: ModelField;
  widget?: FieldWidget;
}) {
  const { data: info } = useAdminInfo();
  const wdgt = widget ?? field.widget ?? info?.widgets[field.type]?.name;

  switch (wdgt) {
    case FieldWidget.InputWidget:
      return <Input value={value} onChange={(e) => onChange(e.target.value)} />;
    default:
      return (
        <Input readOnly value={value ? value.__str__ || String(value) : ""} />
      );
  }
}
