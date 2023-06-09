type UserOptions = {
  id: number;
  username: string;
  password: string;
};

export class User {
  private id: number;
  private username: string;
  private password: string;

  private constructor({ id, username, password }: UserOptions) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static create(username: string, password: string) {
    const id = Math.floor(Math.random() * 1000);

    return new User({ id, username, password });
  }

  static buildEntity(id: number, username: string, password: string) {
    return new User({ id, username, password });
  }

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}
