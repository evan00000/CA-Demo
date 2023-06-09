import { User } from './user.entity';

export class UserEmail {
  private user: User;
  private email: string;
  private confirm: boolean;
  private confirm_at: Date;

  private constructor({ user }) {
    this.user = user;
    this.confirm = false;
    this.confirm_at = null;
  }

  static create(user: User, email: string): UserEmail {
    const userEmail = new UserEmail({ user });
    userEmail.email = email;

    return userEmail;
  }

  static buildEntity(
    user: User,
    email: string,
    confirm: boolean,
    confirm_at: Date,
  ): UserEmail {
    const userEmail = new UserEmail({ user });
    userEmail.email = email;
    userEmail.confirm = confirm;
    userEmail.confirm_at = confirm_at ?? null;

    return userEmail;
  }

  getUser(): User {
    return this.user;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;

    return this;
  }

  isConfirm(): boolean {
    return this.confirm;
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;

    return this;
  }

  getConfirmAt(): Date {
    return this.confirm_at;
  }

  setConfirmAt(confirm_at: Date) {
    this.confirm_at = confirm_at;

    return this;
  }
}
