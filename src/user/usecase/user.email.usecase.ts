import { Injectable, Inject } from '@nestjs/common';
import { UserEmailDTOBuildFrom } from './dto/user.email.dto';
import { UserRepository } from '../repository/user.repository';
import { USER_QUERY_REPOSITORY } from '../user.constant';

export interface GetUserEmailByUserIdUseCaseInput {
  readonly user_id: number;
}

export interface GetUserEmailByUserIdUseCaseOutput {
  readonly user_id: number;
  readonly email: string;
  readonly confirm: boolean;
  readonly confirm_at: string;
}

@Injectable()
export class GetUserEmailByUserIdUseCase {
  protected repo: UserRepository;

  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    repo: UserRepository,
  ) {
    this.repo = repo;
  }

  async execute(
    input: GetUserEmailByUserIdUseCaseInput,
  ): Promise<GetUserEmailByUserIdUseCaseOutput> {
    const user = await this.repo.getById(input.user_id);

    if (!user) {
      throw new Error('No such user');
    }

    const email = await this.repo.getEmailByUser(user);

    const output: GetUserEmailByUserIdUseCaseOutput = UserEmailDTOBuildFrom(email);

    return output;
  }
}
