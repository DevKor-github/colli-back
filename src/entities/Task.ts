import { Column } from 'typeorm';
import { BasicDate } from './BasicDate';

export abstract class Task extends BasicDate {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  deadline: string;
}
