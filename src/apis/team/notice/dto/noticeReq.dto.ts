import { ApiProperty } from '@nestjs/swagger';

export class NoticeReqDto {
  @ApiProperty({ description: '공지 제목' })
  title: string;

  @ApiProperty({ description: '내용' })
  content: string;
}
