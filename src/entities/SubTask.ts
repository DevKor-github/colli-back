import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Task } from './Task';

@Entity('sub_task')
export class SubTask extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  taskId: number;

  @Column()
  subTitle: string;

  @Column()
  content: string;

  @Column()
  progress: number;
}
