import { useState } from "react";

import { useAdminInfo } from "@/hooks/use-admin-info";
import { cn } from "@/lib/utils";
import { UsernamePasswordBackend } from "@/pages/(auth)/login/_backends/username-password";
import { LoginBackendType } from "@/types";

export function LoginPage() {
  const [online] = useState(true);
  const { data: adminInfo } = useAdminInfo();

  return adminInfo ? (
    <>
      {adminInfo.login_backends.map((backend) => {
        switch (backend.type) {
          case LoginBackendType.UsernamePassword:
            return <UsernamePasswordBackend config={backend.config} />;
          default:
            return null;
        }
      })}

      <div className="py-12 flex flex-col items-center">
        <div className="text-xs text-muted-foreground text-center mb-2">
          Django Content Studio v{adminInfo.version}
        </div>
        {adminInfo.health_check && (
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
        )}
      </div>
    </>
  ) : null;
}
