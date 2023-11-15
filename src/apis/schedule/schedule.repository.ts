import { Injectable } from '@nestjs/common';
import { TeamSchedule, UserSchedule } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserScheduleRepository extends Repository<UserSchedule> {}

@Injectable()
export class TeamScheduleRepository extends Repository<TeamSchedule> {}
