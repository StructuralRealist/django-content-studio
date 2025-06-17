import { LucideEye, LucideEyeOff, LucideLock, LucideMail } from "lucide-react";
import * as R from "ramda";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import pkg from "../../../../package.json";

export function LoginPage() {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [online, setOnline] = useState(true);

  return (
    <>
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold text-foreground text-center">
          {t("login.title")}
        </h1>
        <div className="text-muted-foreground text-center mb-12">
          {t("login.subtitle")}
        </div>
        <div className="border rounded-lg bg-background p-4 w-full shadow-sm shadow-foreground/5">
          <div className="relative flex items-center mb-4">
            <LucideMail className="size-4 stroke-accent-foreground/50 absolute left-3" />
            <Input
              type="email"
              placeholder={t("login.email_placeholder")}
              className="px-9"
            />
          </div>
          <div className="relative flex items-center mb-6">
            <LucideLock className="size-4 stroke-accent-foreground/50 absolute left-3" />
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder={t("login.password_placeholder")}
              className="px-9"
            />
            <button
              className="z-10 absolute right-3 hover:cursor-pointer"
              onClick={() => setPasswordVisible(R.not)}
            >
              {passwordVisible ? (
                <LucideEyeOff className="size-4 stroke-accent-foreground/50" />
              ) : (
                <LucideEye className="size-4 stroke-accent-foreground/50" />
              )}
            </button>
          </div>
          <div className="mb-4">
            <Label>
              <Checkbox />
              {t("login.remember_me")}
            </Label>
          </div>
          <Button className="w-full mb-2" onClick={() => setOnline(false)}>
            {t("login.submit")}
          </Button>
          <div className="text-center">
            <Link to="/forgot-password" className="text-xs hover:underline">
              {t("login.forgot_password")}
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? Contact your administrator
        </div>
      </div>
      <div className="py-12 flex flex-col items-center">
        <div className="text-xs text-muted-foreground text-center mb-2">
          Django Content Studio v{pkg.version}
        </div>
        <div
          className={cn(
            "select-none inline-flex items-center justify-center gap-1.5 rounded px-2 py-0.5",
            online ? "bg-emerald-50" : "bg-rose-50",
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "size-2.5 rounded-full",
                online ? "bg-emerald-300" : "bg-rose-300",
              )}
            />
            {!online && (
              <div className="size-2.5 rounded-full bg-rose-300 animate-ping absolute top-0" />
            )}
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              online ? "text-emerald-500" : "text-rose-500",
            )}
          >
            CMS is {online ? "online" : "offline"}
          </span>
        </div>
      </div>
    </>
  );
}
