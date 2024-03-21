import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';
import { SubTask } from './SubTask';

export class Comment extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubTask)
  @JoinColumn({ name: 'subTaskId' })
  subTask: SubTask;

  @Column()
  subTaskId: number;

  /**
   comment 내용
   */
  @Column()
  content: string;
}
