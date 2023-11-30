import { TeamSchedule, UserSchedule } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { UserScheduleResDto } from './dto/userScheduleRes.dto';
import { TeamScheduleResDto } from './dto/teamScheduleRes.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserScheduleRepository extends Repository<UserSchedule> {
  constructor(private dataSource: DataSource) {
    super(UserSchedule, dataSource.createEntityManager());
  }

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
  }
}

@Injectable()
export class TeamScheduleRepository extends Repository<TeamSchedule> {
  constructor(private dataSource: DataSource) {
    super(TeamSchedule, dataSource.createEntityManager());
  }

  async findTeamScheduleDetail(
    scheduleId: number,
    color: number,
  ): Promise<TeamScheduleResDto> {
    return this.findOneByOrFail({ id: scheduleId }).then((data) =>
      TeamScheduleResDto.makeRes(data, color),
    );
  }

  async findTeamCalendar(
    teamId: number,
    startDate: Date,
    endDate: Date,
    color: number = 0,
  ): Promise<TeamScheduleResDto[]> {
    // console.log(
    //   await this.createQueryBuilder('team_schedule')
    //     .leftJoinAndSelect('team_schedule.team', 'team')
    //     .where('team_schedule.teamId = :teamId', { teamId })
    //     .andWhere(
    //       '!(team_schedule.endTime < :startDate or team_schedule.startTime >= :endDate)',
    //       { startDate, endDate },
    //     )
    //     .getQuery(),
    // );

    const scheduleList = await this.createQueryBuilder('team_schedule')
      .leftJoinAndSelect('team_schedule.team', 'team')
      .where('team_schedule.teamId = :teamId', { teamId })
      .andWhere(
        '!(team_schedule.endTime < :startDate or team_schedule.startTime >= :endDate)',
        { startDate, endDate },
      )
      .getMany();
    // console.log(scheduleList);

    return scheduleList.map((sc) => TeamScheduleResDto.makeRes(sc, color));
  }
}
