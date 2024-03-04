import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from 'src/entities';

export class ScheduleResDto {
  @ApiProperty({ description: '일정 고유 id' })
  id: number;

  @ApiProperty({ description: '팀 고유 id' })
  teamId: number;

  @ApiProperty({ description: '팀 이름' })
  teamName: string;

  @ApiProperty({ description: '일정 제목' })
  title: string;

  @ApiProperty({ description: '일정 내용' })
  content: string;

  @ApiProperty({ description: '일정 시작 시간' })
  startTime: Date;

  @ApiProperty({ description: '일정 종료 시간' })
  endTime: Date;

  static makeRes(data: Schedule) {
    const resData = new ScheduleResDto();

    resData.id = data.id;
    resData.content = data.content;
    resData.startTime = data.startTime;
    resData.endTime = data.endTime;
    resData.teamId = data.teamId;
    resData.teamName = data.team.name;

    return resData;
  }
}
