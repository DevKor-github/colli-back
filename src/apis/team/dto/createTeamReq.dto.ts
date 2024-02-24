import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeamReqDto {
  @ApiProperty({ description: '팀 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '소개' })
  @IsString()
  description: string;

  @ApiProperty({ description: '?' })
  deadline: string;

  @ApiProperty({ description: '팀 초대 코드' })
  code: string;
}
