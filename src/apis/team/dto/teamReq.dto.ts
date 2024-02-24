import { ApiProperty } from '@nestjs/swagger';

export class TeamReqDto {
  @ApiProperty({ description: '팀 id' })
  id: number;

  @ApiProperty({ description: '팀 이름' })
  name: string;

  @ApiProperty({ description: '팀 소개' })
  description: string;

  @ApiProperty({ description: '마감 기한' }) //?
  deadline: string;

  @ApiProperty({ description: '팀 코드' }) //?
  code: string;
}
