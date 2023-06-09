import { User } from '../entity/user.entity';
import { UserEmail } from '../entity/user.email.entity';
import { UserRepository } from '../repository/user.repository';
import { DateTime } from '../../utility/datetime';
import {
  GetUserEmailByUserIdUseCaseInput,
  GetUserEmailByUserIdUseCase,
} from './user.email.usecase';

describe('GetUserEmailByUserId UseCase', () => {
  let repo: UserRepository;
  const fn = jest.fn();

  beforeEach(() => {
    repo = {
      getById: fn,
      getEmailByUser: fn,
    };
  });

  describe('execute', () => {
    it('should return email', async () => {
      const input: GetUserEmailByUserIdUseCaseInput = {
        user_id: 10,
      };

      const user = User.buildEntity(input.user_id, 'test1', 'password1');
      fn.mockReturnValueOnce(user);

      const email = UserEmail.buildEntity(
        user,
        'test123@email.com',
        false,
        new DateTime('2023-01-01 00:00:00').toDate(),
      );
      fn.mockReturnValueOnce(email);

      const uc = new GetUserEmailByUserIdUseCase(repo);
      const output = await uc.execute(input);

      expect(output).toBeDefined();
      expect(output.user_id).toBe(10);
      expect(output.email).toBe('test123@email.com');
      expect(output.confirm).toBeFalsy();
      expect(output.confirm_at).toBe('2023-01-01T00:00:00+08:00');
    });

    it('should return error', async () => {
      const input: GetUserEmailByUserIdUseCaseInput = {
        user_id: 10,
      };

      fn.mockReturnValueOnce(null);

      const uc = new GetUserEmailByUserIdUseCase(repo);
      return uc.execute(input).catch((error: Error) => {
        expect(error.message).toBe('No such user');
      });
    });
  });
});
