export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: number;
  email: string;
  login: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  login: string;
  password: string;
}
