import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Team } from './Team';
import { BasicDate } from './BasicDate';

@Entity('member')
export class Member extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;

  @Column({ default: false })
  isManager: boolean;

  @Column()
  color: number;

  @Column()
  order: number;
}
