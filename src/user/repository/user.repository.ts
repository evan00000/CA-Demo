import { User } from '../entity/user.entity';
import { UserEmail } from '../entity/user.email.entity';

export const ErrUserNotFound = new Error(
  'the user was not found in the repository',
);

export interface UserRepository {
  getById(id: number): Promise<User>;
  getEmailByUser(user: User): Promise<UserEmail>;
}
