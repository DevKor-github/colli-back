import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ScheduleReqDto {
  @ApiProperty({ description: '일정 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '일정 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '일정 시작 시간' })
  startTime: string;

  @ApiProperty({ description: '일정 종료 시간' })
  endTime: string;
}
