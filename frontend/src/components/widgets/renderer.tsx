import { Input } from "@/components/ui/input";
import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldWidget, type ModelField } from "@/types";

export function WidgetRenderer({
  value,
  field,
  widget,
}: {
  value: unknown;
  field: ModelField;
  widget?: FieldWidget;
}) {
  const { data: info } = useAdminInfo();
  const wdgt = widget ?? field.widget ?? info?.widgets[field.type]?.name;

  switch (wdgt) {
    default:
      return <Input value={String(value)} />;
  }
}
