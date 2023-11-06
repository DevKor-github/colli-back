import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('auth_user')
class AuthUser extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;
}

export default AuthUser;
