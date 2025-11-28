import * as R from "ramda";
import React, { useMemo } from "react";

import { useAdminInfo } from "@/hooks/use-admin-info";
import { FieldType, FieldWidget, type ModelField } from "@/types";

import { CheckboxWidget } from "./checkbox-widget.tsx";
import { DateWidget } from "./date-widget";
import { FallbackWidget } from "./fallback-widget";
import { ForeignKeyWidget } from "./foreign-key-widget";
import { InputWidget } from "./input-widget";
import { JSONSchemaWidget } from "./json-schema-widget";
import { ManyToManyWidget } from "./many-to-many-widget";
import { MediaWidget } from "./media-widget";
import { MultiSelectWidget } from "./multi-select-widget";
import { RichTextWidget } from "./rich-text-widget";
import { SelectWidget } from "./select-widget";
import { SlugWidget } from "./slug-widget";
import { TextAreaWidget } from "./text-area-widget";
import { URLPathWidget } from "./url-path-widget";

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
        [R.equals(FieldWidget.DateWidget), R.always(DateWidget)],
        [R.equals(FieldWidget.ForeignKeyWidget), R.always(ForeignKeyWidget)],
        [R.equals(FieldWidget.InputWidget), R.always(InputWidget)],
        [R.equals(FieldWidget.JSONSchemaWidget), R.always(JSONSchemaWidget)],
        [R.equals(FieldWidget.ManyToManyWidget), R.always(ManyToManyWidget)],
        [R.equals(FieldWidget.MediaWidget), R.always(MediaWidget)],
        [R.equals(FieldWidget.MultiSelectWidget), R.always(MultiSelectWidget)],
        [R.equals(FieldWidget.RichTextWidget), R.always(RichTextWidget)],
        [R.equals(FieldWidget.TextAreaWidget), R.always(TextAreaWidget)],
        [R.equals(FieldWidget.SlugWidget), R.always(SlugWidget)],
        [R.equals(FieldWidget.URLPathWidget), R.always(URLPathWidget)],
        [R.equals(FieldWidget.CheckboxWidget), R.always(CheckboxWidget)],
        [R.T, R.always(FallbackWidget)],
      ])(widgetClass),
    [field.choices, field.type, widgetClass],
  );

  return <WidgetComp value={value} onChange={onChange} field={field} />;
}
