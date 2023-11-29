import { ApiProperty } from '@nestjs/swagger';

export class ScheduleResDto {
  @ApiProperty({ description: '일정 고유 id' })
  id: number;

  @ApiProperty({ description: '일정 제목' })
  title: string;

  @ApiProperty({ description: '일정 내용' })
  content: string;

  @ApiProperty({ description: '일정 시작 시간' })
  startTime: Date;

  @ApiProperty({ description: '일정 종료 시간' })
  endTime: Date;
}
