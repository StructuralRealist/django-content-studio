import * as R from "ramda";
import React, { useMemo } from "react";

import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldType, FieldWidget, type ModelField } from "@/types";

import { FallbackWidget } from "./fallback-widget";
import { ForeignKeyWidget } from "./foreign-key-widget";
import { InputWidget } from "./input-widget";
import { JSONSchemaWidget } from "./json-schema-widget";
import { RichTextWidget } from "./rich-text-widget";
import { SelectWidget } from "./select-widget";

export function WidgetRenderer({
  value,
  onChange,
  field,
}: {
  value: any;
  onChange(value: any): void;
  field: ModelField;
}) {
  const { data: info } = useAdminInfo();
  const widgetClass =
    field.widget_class ?? info?.widgets[field.type]?.name ?? null;

  const WidgetComp = useMemo(
    () =>
      R.cond([
        [R.isNil, R.always(InputWidget)],
        [
          () => field.type === FieldType.CharField && !R.isNil(field.choices),
          R.always(SelectWidget),
        ],
        [R.equals(FieldWidget.InputWidget), R.always(InputWidget)],
        [R.equals(FieldWidget.RichTextWidget), R.always(RichTextWidget)],
        [R.equals(FieldWidget.URLPathWidget), R.always(InputWidget)],
        [R.equals(FieldWidget.JSONSchemaWidget), R.always(JSONSchemaWidget)],
        [R.equals(FieldWidget.ForeignKeyWidget), R.always(ForeignKeyWidget)],
        [R.T, R.always(FallbackWidget)],
      ])(widgetClass),
    [field.choices, field.type, widgetClass],
  );

  return <WidgetComp value={value} onChange={onChange} field={field} />;
}
