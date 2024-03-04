import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Team } from './Team';

@Entity('schedule')
export class Schedule extends BasicDate {
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
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  memo: string;
}
