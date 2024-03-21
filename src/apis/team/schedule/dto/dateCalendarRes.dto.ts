import { ApiProperty } from '@nestjs/swagger';
import { ScheduleResDto } from './scheduleRes.dto';

export class DateCalendarResDto {
  @ApiProperty({ description: '유저/팀 스케쥴 목록' })
  dataList: ScheduleResDto[];

  @ApiProperty({ description: '배열 길이' })
  totalCount: number;

  static makeRes(arr: ScheduleResDto[], length: number) {
    const resDto = new DateCalendarResDto();

    resDto.dataList = arr;
    resDto.totalCount = length;

    return resDto;
  }
}
