import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate, Member, TeamTask } from './';

@Entity('task_assign')
export class TaskAssign extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamTask)
  @JoinColumn({ name: 'teamTaskId' })
  teamTask: TeamTask;

  @Column()
  temaTaskId: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column()
  memberId: number;

  @Column()
  remindTime: number;

  @Column()
  memo: string;
}
