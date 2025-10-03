export type AuthState = {
  isAuthenticated: boolean;
  user: {
    email: string;
    rememberMe: boolean;
  } | null;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkStoredAuth: () => Promise<void>;
};
