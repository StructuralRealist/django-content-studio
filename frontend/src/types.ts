export enum AuthStrategy {
  JWT = "jwt",
}

export interface AuthState {
  token: string | null;
  setToken(token: string | null): void;
  strategy: AuthStrategy | null;
  setStrategy(strategy: AuthStrategy | null): void;
  isAuthenticated: boolean;
}
