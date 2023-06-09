import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_email' })
export class UserEmailModel {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  user_id: number;

  @Column({ comment: 'email' })
  email: string;

  @Column({ comment: '是否確認' })
  confirm: boolean;

  @Column({ comment: '確認時間' })
  confirm_at: Date;
}
