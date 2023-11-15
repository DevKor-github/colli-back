import { Injectable } from '@nestjs/common';
import {
  TeamScheduleRepository,
  UserScheduleRepository,
} from './schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly userScheduleRepository: UserScheduleRepository,
    private readonly teamScheduleRepository: TeamScheduleRepository,
  ) {}
}
