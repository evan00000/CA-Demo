import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from './adapter/model/user.model';
import { UserEmailModel } from './adapter/model/user.email.model';
import { MySqlUserQueryRepository } from './adapter/mysql.user.query.repository';

import { GetUserByIdUseCase } from './usecase/user.usecase';
import { GetUserEmailByUserIdUseCase } from './usecase/user.email.usecase';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserModel, UserEmailModel], 'default'),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_QUERY_REPOSITORY',
      useClass: MySqlUserQueryRepository,
    },
    GetUserByIdUseCase,
    GetUserEmailByUserIdUseCase,
  ],
})
export class UserModule {}
