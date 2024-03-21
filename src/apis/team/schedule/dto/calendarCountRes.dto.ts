import { ApiProperty } from '@nestjs/swagger';

export class CalendarCountResDto {
  @ApiProperty({
    description: '날짜별 일정 개수 배열',
  })
  dataList: number[];

  static makeRes(arr: number[]) {
    const resDto = new CalendarCountResDto();

    resDto.dataList = arr;

    return resDto;
  }
}
