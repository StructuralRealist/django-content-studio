import { Textarea } from "@/components/ui/textarea";

export function TextAreaWidget({
  value,
  onChange,
}: {
  onChange(value: any): void;
  value?: any;
}) {
  return (
    <div>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
