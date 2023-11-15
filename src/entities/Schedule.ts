import { Column } from 'typeorm';
import { BasicDate } from './';

export abstract class Schedule extends BasicDate {
  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
