import { ApiProperty } from '@nestjs/swagger';

export class SubTaskReqDto {
  @ApiProperty({ description: '상위 태스크 id' })
  taskId: number;

  @ApiProperty({ description: '하위 태스크 제목' })
  subTitle: string;

  @ApiProperty({ description: '내용' })
  content: string;
}
