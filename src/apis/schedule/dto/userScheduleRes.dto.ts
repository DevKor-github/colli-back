import { ApiProperty } from '@nestjs/swagger';
import { ScheduleResDto } from './scheduleRes.dto';
import { UserSchedule } from 'src/entities';

export class UserScheduleResDto extends ScheduleResDto {
  @ApiProperty({ description: '유저 고유 id' })
  userId: number;

  @ApiProperty({ description: '일정 메모' })
  memo: string;

  static makeRes(data: UserSchedule) {
    const resData = new UserScheduleResDto();

    resData.id = data.id;
    resData.content = data.content;
    resData.startTime = data.startTime;
    resData.endTime = data.endTime;
    resData.userId = data.userId;
    resData.memo = data.memo;

    return resData;
  }
}
