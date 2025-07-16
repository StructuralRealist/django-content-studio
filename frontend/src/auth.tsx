import * as R from "ramda";
import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUpdateEffect } from "react-use";

import { useHttp } from "@/hooks/use-http";
import { type AuthState } from "@/types";

const LOCALE_STORAGE_KEY = "__dcs_token__";
const AuthContext = React.createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(LOCALE_STORAGE_KEY) ?? null,
  );
  const http = useHttp();

  useUpdateEffect(() => {
    if (token) {
      localStorage.setItem(LOCALE_STORAGE_KEY, token);
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(LOCALE_STORAGE_KEY);
      delete http.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !R.isNil(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthGuard() {
  const auth = useAuth();
  const location = useLocation();

  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={{ pathname: "/login", search: `redirect=${location.pathname}` }}
      replace
    />
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
