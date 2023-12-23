import { ApiProperty } from '@nestjs/swagger';
import { ScheduleResDto } from './scheduleRes.dto';
import { TeamSchedule } from 'src/entities';

export class TeamScheduleResDto extends ScheduleResDto {
  @ApiProperty({ description: '팀 고유 id' })
  teamId: number;

  @ApiProperty({ description: '팀 이름' })
  teamName: string;

  @ApiProperty({ description: '멤버 테이블에 저장되어 있는 유저별 팀 색깔' })
  color: number;

  static makeRes(data: TeamSchedule, color: number) {
    const resData = new TeamScheduleResDto();

    resData.id = data.id;
    resData.content = data.content;
    resData.startTime = data.startTime;
    resData.endTime = data.endTime;
    resData.teamId = data.teamId;
    resData.teamName = data.team.name;
    resData.color = color;

    return resData;
  }
}
