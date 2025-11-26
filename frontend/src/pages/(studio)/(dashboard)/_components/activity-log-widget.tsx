import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { useDiscover } from "@/hooks/use-discover.ts";
import { useHttp } from "@/hooks/use-http.ts";
import { cn } from "@/lib/utils.ts";
import { type ActivityLogEntry, DashboardWidgetType } from "@/types.ts";

export function ActivityLogWidget() {
  const http = useHttp();
  const { t } = useTranslation();
  const { data: discover } = useDiscover();
  const { data } = useQuery({
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryKey: ["dashboard", "activity-log"],
    async queryFn() {
      const { data } = await http.get<ActivityLogEntry[]>(
        `/dashboard/${DashboardWidgetType.ActivityLogWidget.toLowerCase()}`,
      );

      return data;
    },
  });

  return (
    <div className="p-4">
      <h2 className="font-medium">
        {t("dashboard.widgets.activity_log.title")}
      </h2>
      <div className="text-muted-foreground font-medium mb-6">
        {t("dashboard.widgets.activity_log.subtitle")}
      </div>
      <ul className="space-y-4">
        {data?.map((item) => {
          const model = discover?.models.find(
            R.whereEq({ label: item.object_model }),
          );

          return (
            <li key={item.id} className="flex items-center gap-2">
              <div className="rounded-full bg-secondary size-8 flex items-center justify-center font-medium uppercase select-none">
                {item.user?.__str__.slice(0, 2)}
              </div>
              <div>
                <div className="flex gap-1 text-sm font-medium">
                  <div>{item.user?.__str__}</div>
                  <div className="text-muted-foreground">
                    {t(
                      `dashboard.widgets.activity_log.action_flags.${item.action_flag}`,
                    )}
                  </div>
                  <div className="flex gap-1 items-center">
                    {model?.admin.icon && (
                      <span
                        className={cn(model.admin.icon, "text-stone-600")}
                      />
                    )}
                    <div className="line-clamp-1 break-all">
                      {item.action_flag === 3 ? (
                        item.object_repr
                      ) : (
                        <Link
                          className="hover:underline"
                          to={{
                            hash: `editor:${item.object_model}:${item.object_id}`,
                          }}
                        >
                          {item.object_repr}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {dayjs(item.action_time).fromNow()}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
