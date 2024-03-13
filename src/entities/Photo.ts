import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('photo')
export class Photo extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string; //enum으로 하면 좋을듯
  //이상한 이름인지 아닌지 검사해야함.
  @Column()
  oriName: string;

  @Column()
  pathName: string;
}
