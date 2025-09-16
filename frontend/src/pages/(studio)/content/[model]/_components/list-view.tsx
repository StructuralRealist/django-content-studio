import { useNavigate } from "react-router";

import { FormatRenderer } from "@/components/formats/renderer";
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
  const navigate = useNavigate();

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
            <TableRow
              key={item.id}
              onClick={() =>
                navigate({ hash: `#editor:${model.label}:${item.id}` })
              }
            >
              {model.admin.list.display.map((field) => (
                <TableCell key={field}>
                  <FormatRenderer
                    value={item[field]}
                    field={model.fields[field]}
                    format={model.admin.format_mapping?.[field]?.name}
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
