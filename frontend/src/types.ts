import colors from "tailwindcss/colors";

export type TailwindColor = Exclude<
  keyof typeof colors,
  "inherit" | "transparent" | "current" | "black" | "white"
>;

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

export interface ModelGroup {
  models: string[];
  name: string;
  icon: null;
  color: TailwindColor;
  label: string;
}

export interface Model {
  label: string;
  verbose_name: string;
  verbose_name_plural: string;
  admin: {
    icon: string | null;
    list: {
      description: string;
      display: string[];
    };
  };
  fields: Record<string, ModelField>;
}

export interface ModelField {
  type: FieldType;
  verbose_name?: string;
  required?: boolean;
  readonly?: boolean;
  default?: unknown;
  primary_key?: boolean;
  max_length?: number;
  help_text?: string;
  widget?: string;
}

export enum FieldType {
  CharField = "CharField",
  EmailField = "EmailField",
  TextField = "TextField",
  URLPathField = "URLPathField",
  DateField = "DateField",
  DateTimeField = "DateTimeField",
  TimeField = "TimeField",
  BooleanField = "BooleanField",
  IntegerField = "IntegerField",
  FloatField = "FloatField",
  DecimalField = "DecimalField",
  UUIDField = "UUIDField",
  SlugField = "SlugField",
}
