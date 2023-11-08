import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task';
import Member from './Member';

export class TaskAssign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  taskId: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  memberId: number;
}
