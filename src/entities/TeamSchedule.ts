import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team, Schedule } from './';

@Entity('team_schedule')
export class TeamSchedule extends Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;
}
