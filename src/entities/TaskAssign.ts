import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './Member';
import { TeamTask } from './TeamTask';

@Entity('task_assign')
export class TaskAssign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamTask)
  @JoinColumn({ name: 'teamTaskId' })
  temaTaskId: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  memberId: number;

  @Column()
  remindTime: number;

  @Column()
  memo: string;
}
