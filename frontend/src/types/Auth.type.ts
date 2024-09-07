import type { ToDoGroup } from "./ToDoGroup.type";

// TODO: Create LoginResponse (Token, RefreshToken, User)

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
