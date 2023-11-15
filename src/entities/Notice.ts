import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate, Team } from './';

@Entity('notice')
export class Notice extends BasicDate {
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
}
