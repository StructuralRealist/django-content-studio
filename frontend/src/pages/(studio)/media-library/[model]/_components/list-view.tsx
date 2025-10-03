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
import { useDiscover } from "@/hooks/use-discover";

export function ListView({
  items,
}: {
  items: { id: number | string; [p: string]: unknown }[];
}) {
  const { data: discover } = useDiscover();
  const navigate = useNavigate();
  const model = discover?.media_library.models.media_model;

  return (
    model && (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(model.fields).map((field) => (
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
                {Object.keys(model.fields).map((field) => (
                  <TableCell key={field}>
                    <FormatRenderer
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
    )
  );
}
