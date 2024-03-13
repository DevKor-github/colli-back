import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Task } from './Task';
import { Photo } from './Photo';

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

  // @OneToMany()
  // @Column()
  // photos: Photo[]
}
