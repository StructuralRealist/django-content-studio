import * as R from "ramda";

import { WidgetRenderer } from "@/components/widgets/renderer";
import type { Model } from "@/types";

export function Aside({ model, resource }: { model: Model; resource?: any }) {
  const {
    admin: {
      edit: { sidebar },
    },
  } = model;
  const hasSidebar = !R.isEmpty(sidebar) && !R.isNil(sidebar);

  console.log(model);

  return (
    hasSidebar && (
      <aside>
        {sidebar.map((formset, idx) => (
          <section key={idx} className="border rounded-lg p-4 w-full">
            <div className="mb-4">
              <h4 className="font-semibold">{formset.title}</h4>
              {formset.description ? (
                <div className="text-sm text-muted-foreground">
                  {formset.description}
                </div>
              ) : null}
            </div>
            <div className="space-y-3">
              {formset.fields
                .filter((field) => R.has(field, model.fields))
                .map((field, idx) => (
                  <div>
                    <WidgetRenderer
                      key={idx}
                      field={model.fields[field]}
                      value={resource?.[field]}
                    />
                  </div>
                ))}
            </div>
          </section>
        ))}
      </aside>
    )
  );
}
