import { useFormContext } from "react-hook-form";

import { FormatRenderer } from "@/components/formats/renderer";
import {
  FormControl,
  FormDescription,
  FormField as RootFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { WidgetRenderer } from "@/components/widgets/renderer";
import type { FormField as IFormField, Model } from "@/types";

export function FormField({
  formField,
  model,
}: {
  formField: IFormField;
  model: Model;
}) {
  const form = useFormContext();
  const modelField = model.fields[formField.name];

  return (
    <div>
      <RootFormField
        control={form.control}
        name={formField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formField.label || modelField?.verbose_name}</FormLabel>
            {!modelField || modelField.readonly ? (
              <FormatRenderer value={field.value} field={modelField} />
            ) : (
              <FormControl>
                <WidgetRenderer field={modelField} {...field} />
              </FormControl>
            )}
            {modelField && (
              <FormDescription>{modelField.help_text}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
