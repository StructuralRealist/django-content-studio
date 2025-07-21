import { DisplayRenderer } from "@/components/display/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Model } from "@/types";

export function ListView({
  items,
  model,
}: {
  items: { id: number | string; [p: string]: unknown }[];
  model: Model;
}) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {model.admin.list.display.map((field) => (
              <TableHead key={field}>
                {model.fields[field]?.verbose_name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {model.admin.list.display.map((field) => (
                <TableCell key={field}>
                  <DisplayRenderer
                    value={item[field]}
                    field={model.fields[field]}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
