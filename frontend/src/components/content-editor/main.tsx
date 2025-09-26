import * as R from "ramda";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WidgetRenderer } from "@/components/widgets/renderer";
import type { Model } from "@/types";

export function Main({ model, resource }: { model: Model; resource?: any }) {
  const {
    admin: {
      edit: { main },
    },
  } = model;
  const showGroups = main.length > 1 || !R.isEmpty(main[0]?.label);

  console.log(main);

  return (
    <div>
      <Tabs defaultValue={main[0]?.label}>
        {showGroups && (
          <TabsList className="w-full">
            {main.filter(R.prop("label")).map((formSetGroup) => (
              <TabsTrigger value={formSetGroup.label}>
                {formSetGroup.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {main.map((formSetGroup) => (
          <TabsContent value={formSetGroup.label}>
            {formSetGroup.formsets.map((formset, idx) => (
              <section key={idx} className="border rounded-lg p-4 w-full">
                <div className="mb-4 empty:hidden">
                  {formset.title && (
                    <h4 className="font-semibold">{formset.title}</h4>
                  )}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
