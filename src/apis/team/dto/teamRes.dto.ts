import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/entities';

export class TeamResDto {
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

  static makeRes(data: Team) {
    const resData = new TeamResDto();

    resData.id = data.id;
    resData.name = data.name;
    resData.description = data.description;
    resData.deadline = data.deadline;
    resData.code = data.code;

    return resData;
  }
}
