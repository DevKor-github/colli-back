import { TeamSchedule, UserSchedule } from 'src/entities';
import { Between, Repository } from 'typeorm';
import { userScheduleResDto } from './dto/userScheduleRes.dto';
import { TeamScheduleResDto } from './dto/teamScheduleRes.dto';
import { CustomRepository } from 'src/common/decorators/customRepository';

@CustomRepository(UserSchedule)
export class UserScheduleRepository extends Repository<UserSchedule> {
  async findUserScheduleDetail(
    scheduleId: number,
  ): Promise<userScheduleResDto> {
    return this.findOneByOrFail({ id: scheduleId }).then((data) =>
      userScheduleResDto.makeRes(data),
    );
  }
}

@CustomRepository(TeamSchedule)
export class TeamScheduleRepository extends Repository<TeamSchedule> {
  async findTeamScheduleDetail(
    scheduleId: number,
    color: number,
  ): Promise<TeamScheduleResDto> {
    return this.findOneByOrFail({ id: scheduleId }).then((data) =>
      TeamScheduleResDto.makeRes(data, color),
    );
  }

  async findTeamCalendar(teamId: number, startTime: string, endTime: string) {
    return this.findAndCount({
      where: [
        { teamId, startTime: Between(startTime, endTime) },
        { teamId, endTime: Between(startTime, endTime) },
      ],
    }).then(([data, totalCount]) => ({
      dataList: data.map((dt) => TeamScheduleResDto.makeRes(dt, 0)),
      totalCount,
    }));
  }
}
