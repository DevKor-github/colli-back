import { Column } from 'typeorm';
import { BasicDate } from './';

export abstract class Task extends BasicDate {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  deadline: string;
}
