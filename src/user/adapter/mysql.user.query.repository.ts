import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserEmail } from '../entity/user.email.entity';
import { UserModel } from './model/user.model';
import { UserEmailModel } from './model/user.email.model';
import { ErrUserNotFound, UserRepository } from '../repository/user.repository';

@Injectable()
export class MySqlUserQueryRepository implements UserRepository {
  private readonly userRepo: Repository<UserModel>;
  private readonly userEmailRepo: Repository<UserEmailModel>;

  constructor(
    @InjectDataSource('default')
    private readonly dataSource: DataSource,
  ) {
    this.dataSource = dataSource;
    this.userRepo = dataSource.getRepository(UserModel);
    this.userEmailRepo = dataSource.getRepository(UserEmailModel);
  }

  async getById(id: number): Promise<User> {
    const u = await this.userRepo.findOneBy({ id });

    if (!u) {
      throw ErrUserNotFound;
    }

    return User.buildEntity(u.id, u.username, u.password);
  }

  async getEmailByUser(user: User): Promise<UserEmail> {
    const ue = await this.userEmailRepo.findOneBy({ user_id: user.getId() });

    if (!ue) {
      throw ErrUserNotFound;
    }

    return UserEmail.buildEntity(user, ue.email, ue.confirm, ue.confirm_at);
  }
}
