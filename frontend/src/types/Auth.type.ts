export class User {
  constructor(
    public id: number,
    public email: string,
    public login: string,
    public role: string
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
