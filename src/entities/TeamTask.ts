import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { Team } from './Team';

@Entity('team_task')
export class TeamTask extends Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;

  @Column()
  remindTime: number;
}
