import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWidget({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {
  return <Checkbox checked={value} onCheckedChange={onChange} />;
}
