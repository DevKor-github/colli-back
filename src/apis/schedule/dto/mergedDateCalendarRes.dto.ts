import { ApiProperty } from '@nestjs/swagger';
import { DateCalendarResDto } from './dateCalendarRes.dto';

export class MergedDateCalendarResDto {
  @ApiProperty({ description: '유저 스케쥴 목록 정보' })
  users: DateCalendarResDto;

  @ApiProperty({ description: '팀 스케쥴 목록 정보' })
  teams: DateCalendarResDto;

  static makeRes(uArr: DateCalendarResDto, tArr: DateCalendarResDto) {
    const resDto = new MergedDateCalendarResDto();

    resDto.users = uArr;
    resDto.teams = tArr;

    return resDto;
  }
}
