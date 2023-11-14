import { ApiProperty } from '@nestjs/swagger';

export class ListResDto<T> {
  @ApiProperty({ description: '데이터 배열' })
  dataList: Array<T>;

  @ApiProperty({ description: '배열 길이', default: 10 })
  totalCount: number;
}
