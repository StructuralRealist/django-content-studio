import * as R from "ramda";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Model } from "@/types";

import { FormSet } from "./form-set";

export function Main({ model }: { model: Model }) {
  const {
    admin: {
      edit: { main },
    },
  } = model;
  const showGroups = main.length > 1 || !R.isEmpty(main[0]?.label);

  return (
    <div>
      <Tabs defaultValue={main[0]?.label}>
        {showGroups && (
          <TabsList className="w-full">
            {main.filter(R.prop("label")).map((formSetGroup, idx) => (
              <TabsTrigger key={idx} value={formSetGroup.label}>
                {formSetGroup.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {main.map((formSetGroup, idx) => (
          <TabsContent key={idx} value={formSetGroup.label}>
            {formSetGroup.formsets.map((formSet, idx) => (
              <section key={idx} className="border rounded-lg p-4 w-full">
                <FormSet model={model} formSet={formSet} />
              </section>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
