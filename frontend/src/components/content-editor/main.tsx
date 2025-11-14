import * as R from "ramda";
import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDiscover } from "@/hooks/use-discover";
import type { Id, Model } from "@/types";

import { FormSet } from "./form-set";
import { Inline } from "./inline";

export function Main({ model, id }: { model: Model; id?: Id | null }) {
  const { t } = useTranslation();
  const { data: discover } = useDiscover();
  const {
    admin: {
      edit: { main, inlines },
    },
  } = model;
  const showGroups =
    main.length > 1 || !R.isEmpty(main[0]?.label) || !R.isEmpty(inlines);
  const groups = main.filter(R.prop("label"));

  return (
    <div>
      <Tabs defaultValue={groups[0]?.label || "default"}>
        {showGroups && (
          <TabsList className="w-full">
            {groups.map((formSetGroup, idx) => (
              <TabsTrigger key={idx} value={formSetGroup.label}>
                {formSetGroup.label}
              </TabsTrigger>
            ))}
            {R.isEmpty(groups) && !R.isEmpty(inlines) && (
              <TabsTrigger value="default">{t("common.general")}</TabsTrigger>
            )}
            {id
              ? inlines.map((inline) => (
                  <TabsTrigger key={inline.model} value={inline.model}>
                    {
                      discover?.models.find(R.whereEq({ label: inline.model }))
                        ?.verbose_name_plural
                    }
                  </TabsTrigger>
                ))
              : null}
          </TabsList>
        )}
        {main.map((formSetGroup, idx) => (
          <TabsContent
            key={idx}
            value={formSetGroup.label || "default"}
            className="space-y-4"
          >
            {formSetGroup.formsets.map((formSet, idx) => (
              <section key={idx} className="border rounded-lg p-4 w-full">
                <FormSet model={model} formSet={formSet} />
              </section>
            ))}
          </TabsContent>
        ))}
        {id
          ? inlines.map((inline) => {
              const inlineModel = discover?.models.find(
                R.whereEq({ label: inline.model }),
              );

              return inlineModel ? (
                <TabsContent key={inline.model} value={inline.model}>
                  <Inline relId={id} model={inlineModel} adminModel={inline} />
                </TabsContent>
              ) : null;
            })
          : null}
      </Tabs>
    </div>
  );
}
