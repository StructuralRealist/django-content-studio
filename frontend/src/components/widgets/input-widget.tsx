import { Input } from "@/components/ui/input";

export function InputWidget({
  value,
  onChange,
}: {
  onChange(value: any): void;
  value?: any;
}) {
  return (
    <div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
