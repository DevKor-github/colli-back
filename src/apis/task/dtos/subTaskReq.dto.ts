import { ApiProperty } from '@nestjs/swagger';

export class SubTaskReqDto {
  @ApiProperty({ description: '하위 태스크 제목' })
  subtitle: string;

  @ApiProperty({ description: '내용' })
  content: string;
}
