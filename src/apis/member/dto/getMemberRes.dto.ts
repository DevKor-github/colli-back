import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/entities';

export class GetMemberResDto {
  @ApiProperty({ description: '멤버 id' })
  memberId: number;

  @ApiProperty({ description: '유저 id' })
  userId: number;

  @ApiProperty({ description: '유저 이름' })
  name: string;

  @ApiProperty({ description: '팀 id' })
  teamId: number;

  @ApiProperty({ description: '팀장 여부' })
  isManager: boolean;

  static makeRes(data: Member) {
    const resData = new GetMemberResDto();

    resData.memberId = data.id;
    resData.userId = data.userId;
    resData.name = data.user.name;
    resData.teamId = data.teamId;
    resData.isManager = data.isManager;

    return resData;
  }
}
