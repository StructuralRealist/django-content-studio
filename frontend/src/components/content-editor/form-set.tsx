import * as R from "ramda";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { WidgetRenderer } from "@/components/widgets/renderer";
import type { FormSet, Model } from "@/types";

export function FormSet({
  formSet,
  model,
}: {
  formSet: FormSet;
  model: Model;
}) {
  const form = useFormContext();

  return (
    <div>
      <div className="mb-4 empty:hidden">
        {formSet.title && <h4 className="font-semibold">{formSet.title}</h4>}
        {formSet.description ? (
          <div className="text-sm text-muted-foreground">
            {formSet.description}
          </div>
        ) : null}
      </div>
      <div className="space-y-3">
        {formSet.fields
          .filter((field) => R.has(field, model.fields))
          .map((fieldName, idx) => {
            const modelField = model.fields[fieldName];

            return (
              <div>
                <FormField
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{modelField.verbose_name}</FormLabel>
                      <FormControl>
                        <WidgetRenderer
                          key={idx}
                          field={modelField}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{modelField.help_text}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
