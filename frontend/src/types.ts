import colors from "tailwindcss/colors";

export type Id = string;
export type DateString = string;
export type DateTimeString = string;

export type TailwindColor = Exclude<
  keyof typeof colors,
  "inherit" | "transparent" | "current" | "black" | "white"
>;

export interface PaginatedResponse<T> {
  pagination: {
    count: number;
    current: number;
    pages: number;
  };
  results: T[];
}

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
  formats: Record<FieldType, { name: FieldFormat }>;
  widgets: Record<FieldType, { name: FieldWidget }>;
  settings: {
    created_at_attr: string;
    created_by_attr: string;
    edited_at_attr: string;
    edited_by_attr: string;
  };
}

export type LoginBackend = UsernamePasswordBackend;

export enum LoginBackendType {
  UsernamePassword = "UsernamePasswordBackend",
}

export interface UsernamePasswordBackend {
  type: LoginBackendType.UsernamePassword;
  config: {
    username_field_type: FieldType.EmailField | FieldType.CharField;
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
    format_mapping: Record<string, { name: FieldFormat }>;
    widget_mapping: Record<string, { name: FieldWidget }>;
    icon: string | null;
    list: {
      per_page: number;
      description: string;
      display: string[];
      search: boolean;
    };
    edit: {
      main: FormSetGroup[];
      sidebar: FormSet[];
    };
    permissions: {
      add_permission: boolean;
      change_permission: boolean;
      delete_permission: boolean;
      view_permission: boolean;
    };
  };
  fields: Record<string, ModelField>;
}

export interface ModelField {
  type: FieldType;
  required?: boolean;
  verbose_name?: string;
  readonly?: boolean;
  default?: unknown;
  primary_key?: boolean;
  max_length?: number;
  help_text?: string;
  widget_class?: FieldWidget;
  format_class?: FieldFormat;
}

export interface Resource {
  id: Id;
  __str__: string;
  [key: string]: unknown;
}

export interface FormSetGroup {
  label: string;
  formsets: FormSet[];
}

export interface FormSet {
  title: string;
  description: string;
  fields: string[];
}

export enum FieldType {
  CharField = "CharField",
  EmailField = "EmailField",
  TextField = "TextField",
  HTMLField = "HTMLField",
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

export enum FieldFormat {
  TextFormat = "TextFormat",
  HtmlFormat = "HtmlFormat",
  BooleanFormat = "BooleanFormat",
  DateFormat = "DateFormat",
  DateTimeFormat = "DateTimeFormat",
  TimeFormat = "TimeFormat",
  NumberFormat = "NumberFormat",
  FileSizeFormat = "FileSizeFormat",
  TagFormat = "TagFormat",
  ForeignKeyFormat = "ForeignKeyFormat",
  MediaFormat = "MediaFormat",
}

export enum FieldWidget {
  InputWidget = "InputWidget",
  TextAreaWidget = "TextAreaWidget",
  SwitchWidget = "SwitchWidget",
  CheckboxWidget = "CheckboxWidget",
  DateWidget = "DateWidget",
  DateTimeWidget = "DateTimeWidget",
  TimeWidget = "TimeWidget",
  RichTextWidget = "RichTextWidget",
  RadioButtonWidget = "RadioButtonWidget",
  SelectWidget = "SelectWidget",
  MultiSelectWidget = "MultiSelectWidget",
  URLPathWidget = "URLPathWidget",
  SlugWidget = "SlugWidget",
}
