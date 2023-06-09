import { Injectable, Inject } from '@nestjs/common';
import { UserDTOBuildFrom } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { USER_QUERY_REPOSITORY } from '../user.constant';

export interface GetUserByIdUseCaseInput {
  readonly id: number;
}

export interface GetUserByIdUseCaseOutput {
  readonly id: number;
  readonly username: string;
}

@Injectable()
export class GetUserByIdUseCase {
  protected repo: UserRepository;

  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    repo: UserRepository,
  ) {
    this.repo = repo;
  }

  async execute(
    input: GetUserByIdUseCaseInput,
  ): Promise<GetUserByIdUseCaseOutput> {
    const user = await this.repo.getById(input.id);

    const output: GetUserByIdUseCaseOutput = UserDTOBuildFrom(user);
    return output;
  }
}
