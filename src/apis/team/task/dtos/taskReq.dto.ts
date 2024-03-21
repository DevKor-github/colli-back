import { ApiProperty } from '@nestjs/swagger';

export class TaskReqDto {
  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '설명' })
  content: string;

  @ApiProperty({ description: '태스크 카테고리 ID' })
  taskCategoryId: number;

  // 걍 받을 때부터 number로 받자
  @ApiProperty({ description: '진행 상태' })
  state: number;

  @ApiProperty({ description: '담당자 멤버 ID' })
  memberId: number;

  @ApiProperty({ description: '마감기한' })
  deadline: Date;
}
