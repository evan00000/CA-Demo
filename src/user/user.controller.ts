import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  GetUserByIdUseCase,
  GetUserByIdUseCaseInput,
} from './usecase/user.usecase';
import {
  GetUserEmailByUserIdUseCase,
  GetUserEmailByUserIdUseCaseInput,
} from './usecase/user.email.usecase';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserEmailByUserIdUseCase: GetUserEmailByUserIdUseCase,
  ) {}

  @Get(':id([0-9]+)')
  async getUserById(@Param('id') id: number) {
    const input: GetUserByIdUseCaseInput = { id };

    const output = await this.getUserByIdUseCase.execute(input);

    return {
      result: 'ok',
      ret: output,
    };
  }

  @Get(':id([0-9]+)/email')
  async getUserEmailByUserId(@Param('id') id: number) {
    const input: GetUserEmailByUserIdUseCaseInput = { user_id: id };

    const output = await this.getUserEmailByUserIdUseCase.execute(input);

    return {
      result: 'ok',
      ret: output,
    };
  }
}
