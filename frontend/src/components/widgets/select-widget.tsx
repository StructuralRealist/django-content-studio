import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export function SelectWidget({
  choices,
  value,
  onChange,
}: {
  choices: string[][];
  onChange?: any;
  value?: any;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {choices.map(([value, label]) => (
          <SelectItem value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
