import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/entities';

export class MemberRelationResDto {
  @ApiProperty({ description: '멤버 id' })
  memberId: number;
  @ApiProperty({ description: '유저 id' })
  userId: number;
  @ApiProperty({ description: '유저 이름' })
  name: string;
  @ApiProperty({ description: '팀 id' })
  teamId: number;
  @ApiProperty({ description: '팀 이름' })
  teamName: string;

  static makeRes(data: Member) {
    const resData = new MemberRelationResDto();

    resData.memberId = data.id;
    resData.userId = data.userId;
    resData.teamId = data.teamId;
    // ?를 넣은 이유는 relation을 안할 수도 있기 때문. 정상적인 동작을 한다면 뒤를 그냥 공백으로 둬도 됨.
    resData.name = data.user?.name ?? '유저 이름';
    resData.teamName = data.team?.name ?? '팀 이름';

    return resData;
  }
}
