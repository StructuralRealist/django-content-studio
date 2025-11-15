"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="h-8 border hover:border-slate-300 px-3 rounded-md flex items-center select-none">
        <div className="flex-1 text-left text-sm">
          {date ? (
            date.toLocaleDateString()
          ) : (
            <span className="text-muted-foreground">
              {t("widgets.date_picker.placeholder")}
            </span>
          )}
        </div>
        <ChevronDownIcon className="size-4 text-muted-foreground/50" />
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          fixedWeeks
          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
