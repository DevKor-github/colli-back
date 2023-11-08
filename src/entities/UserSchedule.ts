import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './Schedule';
import User from './User';

export class UserSchedule extends Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: string;
}
