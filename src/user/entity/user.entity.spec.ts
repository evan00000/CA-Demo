import { User } from './user.entity';

describe('User entity', () => {
  describe('create', () => {
    it('should return user entity', async () => {
      const user = await User.create('test1', 'password1');

      expect(user.getUsername()).toBe('test1');
      expect(user.getId()).not.toBeNull();
      expect(user.getId().toString().length).toBeGreaterThan(1);
      expect(user.getPassword()).not.toBeNull();
    });
  });
});
