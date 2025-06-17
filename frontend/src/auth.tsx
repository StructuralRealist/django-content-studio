import * as R from "ramda";
import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { type AuthState, AuthStrategy } from "@/types";

const AuthContext = React.createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<AuthStrategy | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        strategy,
        setStrategy,
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
