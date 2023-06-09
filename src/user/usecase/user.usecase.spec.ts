import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { GetUserByIdUseCase, GetUserByIdUseCaseInput } from './user.usecase';

describe('GetUserById UseCase', () => {
  let repo: UserRepository;
  const fn = jest.fn();

  beforeEach(() => {
    repo = {
      getById: fn,
      getEmailByUser: fn,
    };
  });

  describe('execute', () => {
    it('should return ok', async () => {
      const input: GetUserByIdUseCaseInput = {
        id: 10,
      };

      const user = User.buildEntity(input.id, 'test1', 'password1');
      fn.mockReturnValueOnce(user);

      const uc = new GetUserByIdUseCase(repo);
      const output = await uc.execute(input);

      expect(output).not.toBeNull();
      expect(output.id).toBe(input.id);
      expect(output.username).toBe('test1');
    });
  });
});
