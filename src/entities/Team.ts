import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('team')
class Team extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;
}

export default Team;
