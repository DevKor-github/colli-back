import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Member } from './Member';
import { SubTask } from './SubTask';

@Entity('task_assign')
export class TaskAssign extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubTask)
  @JoinColumn({ name: 'subTaskId' })
  subTask: SubTask;

  @Column()
  subTaskId: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column()
  memberId: number;

  @Column()
  memo: string;
}
