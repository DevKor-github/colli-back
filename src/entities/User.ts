import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './';

@Entity('user')
export class User extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNum: string;

  @Column()
  evaluation: number;
}
