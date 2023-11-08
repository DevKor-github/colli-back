import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Team from './Team';
import { BasicDate } from './BasicDate';

@Entity('member')
class Member extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  teamId: number;

  @Column({ default: false })
  isManager: boolean;

  @Column()
  color: number;

  @Column()
  order: number;
}

export default Member;
