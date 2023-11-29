import { Column } from 'typeorm';
import { BasicDate } from './BasicDate';

export abstract class Schedule extends BasicDate {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  memo: string;
}
