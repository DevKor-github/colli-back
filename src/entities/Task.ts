import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Team } from './Team';

@Entity('task')
export class Task extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  deadline: string;

  // @Column()
  // remindTime: number;
}
