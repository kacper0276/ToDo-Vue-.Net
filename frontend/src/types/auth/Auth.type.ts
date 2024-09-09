import type { ToDoGroup } from "../todo/ToDoGroup.type";

export class User {
  constructor(
    public id: number,
    public email: string,
    public login: string,
    public role: string,
    public toDoGroups: ToDoGroup[] = []
  ) {}
}

export class LoginCredentials {
  constructor(public email: string, public password: string) {}
}

export class RegisterCredentials {
  constructor(
    public email: string,
    public login: string,
    public password: string,
    public role?: string
  ) {}
}

export class LoginResponse {
  constructor(
    public user: User,
    public token: string,
    public refreshToken: string
  ) {}
}
