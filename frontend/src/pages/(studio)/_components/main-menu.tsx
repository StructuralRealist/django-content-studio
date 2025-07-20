import React from "react";
import { useTranslation } from "react-i18next";
import { PiHouseSimpleBold, PiImageBold, PiNutBold } from "react-icons/pi";
import { Link } from "react-router";
import colors from "tailwindcss/colors";

import { Input } from "@/components/ui/input";
import { useAdminInfo } from "@/hooks/use-admin-info";
import { useMe } from "@/hooks/use-me";
import { useModelGroups } from "@/hooks/use-model-groups";
import { cn } from "@/lib/utils";

export function MainMenu() {
  const { t } = useTranslation();
  const { data: adminInfo } = useAdminInfo();
  const { data: me } = useMe();
  const { data: groups } = useModelGroups();

  return (
    <nav className="w-[200px] shrink-0 flex flex-col bg-stone-50 border-r">
      {adminInfo && (
        <div className="flex items-center gap-2 border-b p-3">
          <div className="bg-gradient-to-tl from-stone-900 to-stone-600 size-7 rounded flex items-center justify-center text-white font-black shrink-0">
            {adminInfo.site_header[0]}
          </div>
          <h2 className="line-clamp-1 break-all text-base font-semibold">
            {adminInfo.site_header}
          </h2>
        </div>
      )}
      <div className="p-3 border-b">
        <Input variant="secondary" placeholder={t("common.search")} />
      </div>
      <div className="flex-1 p-2 space-y-1">
        <MenuItem
          to="/"
          color="slate"
          icon={<PiHouseSimpleBold />}
          label={t("main_menu.dashboard")}
        />
        <MenuItem
          to="/"
          color="pink"
          icon={<PiImageBold />}
          label={t("main_menu.media_library")}
        />
      </div>
      <div className="p-2">
        <MenuItem to="/" icon={<PiNutBold />} label={t("main_menu.settings")} />
      </div>
      <div className="p-1 border-t">
        {me && (
          <div className="flex items-center gap-3 hover:bg-stone-200 p-2 rounded-md select-none">
            <div className="relative rounded-full size-8 bg-indigo-500 text-indigo-100 flex items-center justify-center font-bold shrink-0 text-xs">
              {`${me.first_name ?? ""}${me.last_name ?? ""}${me.username ?? ""}`
                .trim()
                .replace(/\s/g, "")
                .slice(0, 2)
                .toUpperCase()}
              <div className="bg-emerald-500 size-2 rounded-full absolute bottom-px right-px" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">
                {`${me.first_name ?? ""} ${me.last_name ?? ""}`.trim()}
              </div>
              <div className="text-xs text-muted-foreground">{me.username}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

type TailwindColor = Exclude<
  keyof typeof colors,
  "inherit" | "transparent" | "current" | "black" | "white"
>;
const COLORS: Record<TailwindColor, string> = {
  slate: "bg-slate-200 text-slate-600",
  gray: "bg-gray-200 text-gray-600",
  zinc: "bg-zinc-200 text-zinc-600",
  neutral: "bg-neutral-200 text-neutral-600",
  stone: "bg-stone-200 text-stone-600",
  red: "bg-red-100 text-red-600",
  orange: "bg-orange-100 text-orange-600",
  amber: "bg-amber-100 text-amber-600",
  yellow: "bg-yellow-100 text-yellow-600",
  lime: "bg-lime-100 text-lime-600",
  green: "bg-green-100 text-green-600",
  emerald: "bg-emerald-100 text-emerald-600",
  teal: "bg-teal-100 text-teal-600",
  cyan: "bg-cyan-100 text-cyan-600",
  sky: "bg-sky-100 text-sky-600",
  blue: "bg-blue-100 text-blue-600",
  indigo: "bg-indigo-100 text-indigo-600",
  violet: "bg-violet-100 text-violet-600",
  purple: "bg-purple-100 text-purple-600",
  fuchsia: "bg-fuchsia-100 text-fuchsia-600",
  pink: "bg-pink-100 text-pink-600",
  rose: "bg-rose-100 text-rose-600",
};

function MenuItem({
  label,
  icon,
  to,
  color,
}: {
  label: string;
  icon: React.ReactNode;
  to: string;
  color?: TailwindColor;
}) {
  return (
    <Link
      to={to}
      className="flex items-center text-sm font-medium gap-2 h-8 px-2 hover:bg-stone-100 rounded hover:cursor-default"
    >
      <span
        className={cn(
          "size-5 rounded flex items-center justify-center",
          color ? COLORS[color] : "",
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
