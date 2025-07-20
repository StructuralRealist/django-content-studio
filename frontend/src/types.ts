export interface AuthState {
  token: string | null;
  setToken(token: string | null): void;
  isAuthenticated: boolean;
}

export interface AdminInfo {
  site_header: string;
  site_title: string;
  index_title: string;
  site_url: string;
  health_check: null;
  version: string;
  login_backends: LoginBackend[];
  token_backend: TokenBackend;
}

export type LoginBackend = UsernamePasswordBackend;

export enum LoginBackendType {
  UsernamePassword = "UsernamePasswordBackend",
}

export interface UsernamePasswordBackend {
  type: LoginBackendType.UsernamePassword;
  config: {
    username_field_type: "EmailField" | "CharField";
  };
}

export type TokenBackend = SimpleJwtBackend;

export enum TokenBackendType {
  SimpleJwt = "SimpleJwtBackend",
}

export interface SimpleJwtBackend {
  type: TokenBackendType.SimpleJwt;
  config: {
    ACCESS_TOKEN_LIFETIME: number;
  };
}

export interface SessionUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
}
