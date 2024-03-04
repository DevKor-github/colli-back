import { Schedule } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { ScheduleResDto } from './dto/scheduleRes.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {
  constructor(private dataSource: DataSource) {
    super(Schedule, dataSource.createEntityManager());
  }

  async findScheduleDetail(scheduleId: number): Promise<ScheduleResDto> {
    return this.findOneByOrFail({ id: scheduleId }).then((data) =>
      ScheduleResDto.makeRes(data),
    );
  }

  async findScheduleCalendar(
    teamId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ScheduleResDto[]> {
    const scheduleList = await this.createQueryBuilder('team_schedule')
      .leftJoinAndSelect('team_schedule.team', 'team')
      .where('team_schedule.teamId = :teamId', { teamId })
      .andWhere(
        '!(team_schedule.endTime < :startDate or team_schedule.startTime >= :endDate)',
        { startDate, endDate },
      )
      .getMany();
    // console.log(scheduleList);

    return scheduleList.map((sc) => ScheduleResDto.makeRes(sc));
  }

  /*
  async findUserScheduleDetail(
    scheduleId: number,
  ): Promise<UserScheduleResDto> {
    return this.findOneByOrFail({ id: scheduleId }).then((data) =>
      UserScheduleResDto.makeRes(data),
    );
  }

  async findUserCalendar(userId: number, startDate: Date, endDate: Date) {
    const scheduleList = await this.createQueryBuilder('user_schedule')
      .where('user_schedule.userId = :userId', { userId })
      .andWhere(
        '!(user_schedule.endTime < :startDate or user_schedule.startTime >= :endDate)',
        { startDate, endDate },
      )
      .getMany();

    return scheduleList.map((sc) => UserScheduleResDto.makeRes(sc));
  } */
}
