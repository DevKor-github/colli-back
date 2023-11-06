import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('user')
class User extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;
}

export default User;
