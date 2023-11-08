import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('user')
class User extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  university: string;

  @Column()
  department: string;

  @Column()
  univNum: string;

  @Column()
  evaluation: number;
}

export default User;
