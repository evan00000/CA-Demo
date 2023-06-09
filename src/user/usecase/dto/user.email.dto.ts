import { UserEmail } from '../../entity/user.email.entity';
import { DateTime } from '../../../utility/datetime';

export interface UserEmailDTO {
  readonly user_id: number;
  readonly email: string;
  readonly confirm: boolean;
  readonly confirm_at: string | null;
}

export function UserEmailDTOBuildFrom(userEmail: UserEmail): UserEmailDTO {
  const dto = {
    user_id: userEmail.getUser().getId(),
    email: userEmail.getEmail(),
    confirm: userEmail.isConfirm(),
    confirm_at: userEmail.getConfirmAt()
      ? new DateTime(userEmail.getConfirmAt()).format()
      : null,
  };

  return dto;
}
