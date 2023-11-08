import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';
import Team from './Team';

export class Task extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  teamId: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  deadline: string;
}
