import { User } from '../../entity/user.entity';

export interface UserDTO {
  readonly id: number;
  readonly username: string;
}

export function UserDTOBuildFrom(user: User): UserDTO {
  const dto = {
    id: user.getId(),
    username: user.getUsername(),
  };

  return dto;
}
