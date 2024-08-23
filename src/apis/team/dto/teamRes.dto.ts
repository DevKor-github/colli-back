import { ApiProperty } from '@nestjs/swagger';
import { DateResDto } from 'src/common/dto/dateRes.dto';
import { Team } from 'src/entities';

export class TeamResDto extends DateResDto {
  @ApiProperty({ description: '팀 id' })
  id: number;

  @ApiProperty({ description: '팀 이름' })
  name: string;

  @ApiProperty({ description: '팀 소개' })
  description: string;

  @ApiProperty({ description: '팀 코드' }) //?
  code: string;

  static makeRes(data: Team) {
    const resData = new TeamResDto();

    resData.id = data.id;
    resData.name = data.name;
    resData.description = data.description;
    resData.code = data.code;
    resData.createdAt = data.createdAt;

    return resData;
  }
}
