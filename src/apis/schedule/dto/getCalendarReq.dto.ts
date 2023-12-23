import { ApiProperty } from '@nestjs/swagger';

export class GetCalendarReqDto {
  @ApiProperty({ description: '시작 일자' })
  start: string;

  @ApiProperty({ description: '끝 일자' })
  end: string;
}
