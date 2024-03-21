import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { BasicDate, User } from './';
import { BasicDate } from './BasicDate';
import { User } from './User';

@Entity('auth_user')
export class AuthUser extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  /**
   로그인 아이디
   */
  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
