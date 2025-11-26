import { Input } from "@/components/ui/input";

export function SlugWidget({
  value,
  onChange,
}: {
  onChange(value: any): void;
  value?: any;
}) {
  return (
    <div>
      <Input
        value={value}
        onChange={(e) =>
          onChange(e.target.value.toLowerCase().replace(/[^0-9a-z_-]/g, "-"))
        }
      />
    </div>
  );
}
