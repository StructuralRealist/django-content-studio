import * as R from "ramda";

import type { FormSet, Model } from "@/types";

import { FormField } from "./form-field";

export function FormSet({
  formSet,
  model,
}: {
  formSet: FormSet;
  model: Model;
}) {
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
        {formSet.fields.map((formField, idx) =>
          R.has("fields", formField) ? (
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${formField.fields.length}, 1fr)`,
              }}
            >
              {formField.fields.map((innerFormField) => (
                <FormField key={idx} formField={innerFormField} model={model} />
              ))}
            </div>
          ) : (
            <FormField key={idx} formField={formField} model={model} />
          ),
        )}
      </div>
    </div>
  );
}
