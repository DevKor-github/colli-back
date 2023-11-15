import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './';

@Entity('team')
export class Team extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  deadline: string;

  @Column()
  code: string;
}
