import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CreateDatabaseImports } from './infra/database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ...CreateDatabaseImports(),
    UserModule,
  ],
  controllers: [
    AppController,
    // UserController
  ],
  providers: [AppService],
})
export class AppModule {}
