import * as R from "ramda";
import { useNavigate } from "react-router";

import { ContentEditorDialog } from "@/components/content-editor";
import { FormatRenderer } from "@/components/formats/renderer";
import { DialogTrigger } from "@/components/ui/dialog";
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
  items: { id: string; [p: string]: unknown }[];
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
            <ContentEditorDialog
              key={item.id}
              modelLabel={model.label}
              id={item.id}
            >
              <DialogTrigger asChild>
                <TableRow>
                  {model.admin.list.display
                    .filter((field) => !R.isNil(model.fields[field]))
                    .map((field) => (
                      <TableCell key={field}>
                        <FormatRenderer
                          value={item[field]}
                          field={model.fields[field]}
                        />
                      </TableCell>
                    ))}
                </TableRow>
              </DialogTrigger>
            </ContentEditorDialog>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
