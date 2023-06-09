import { UserEmail } from './user.email.entity';
import { User } from './user.entity';
import { DateTime } from '../../utility/datetime';

describe('UserEmail entity', () => {
  describe('create', () => {
    it('should return user email entity', async () => {
      const user = await User.create('test1', 'password1');
      const userEmail = await UserEmail.create(user, 'thisisemail@emailtest.com');

      expect(userEmail.getUser()).toBeDefined();
      expect(userEmail.getEmail()).toBe('thisisemail@emailtest.com');
      expect(userEmail.isConfirm()).toBeFalsy();
      expect(userEmail.getConfirmAt()).toBeNull();
    });
  });

  describe('basic', () => {
    it('should return user email entity', async () => {
      const user = await User.create('test1', 'password1');
      const userEmail = await UserEmail.create(user, 'thisisemail@emailtest.com');

      expect(userEmail.getUser()).toBeDefined();
      expect(userEmail.getEmail()).toBe('thisisemail@emailtest.com');
      expect(userEmail.isConfirm()).toBeFalsy();
      expect(userEmail.getConfirmAt()).toBeNull();

      userEmail
        .setConfirm(true)
        .setEmail('thisisemail2@emailtest.com')
        .setConfirmAt(new DateTime('2023-01-01 00:00:00').tz().toDate());

      expect(userEmail.getEmail()).toBe('thisisemail2@emailtest.com');
      expect(userEmail.isConfirm()).toBeTruthy();
      expect(userEmail.getConfirmAt()).toBeDefined();
    });
  });
});
