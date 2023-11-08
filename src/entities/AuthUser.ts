import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import User from './User';

@Entity('auth_user')
class AuthUser extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}

export default AuthUser;
