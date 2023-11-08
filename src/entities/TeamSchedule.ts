import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './Schedule';
import Team from './Team';

export class TeamSchedule extends Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  teamId: number;
}
