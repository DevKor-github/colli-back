import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import { Team } from './Team';
import { TaskCategory } from './TaskCategory';
import { Member } from './Member';

//일단은 개별 담당자로 만드는중..
//만약 나중에 담당자를 여러명으로 돌릴 생각이라면 좀 수정해야함.
@Entity('task')
export class Task extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  teamId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => TaskCategory)
  @JoinColumn({ name: 'categoryId' })
  taskCategory: TaskCategory;

  @Column()
  categoryId: number;

  // 0: To Do, 1: In Progress, 2: Done
  @Column()
  state: number;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column()
  memberId: number;

  @Column()
  deadline: Date;

  //이 진척도는 단순 콕찌르는 용인가???
  @Column()
  progress: number;
}
