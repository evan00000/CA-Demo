import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({ comment: '帳號' })
  username: string;

  @Column({ comment: '密碼' })
  password: string;
}
