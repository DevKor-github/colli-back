import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/entities';

export class MemberMetaResDto {
  @ApiProperty({ description: '팀 색깔' })
  color: number;

  @ApiProperty({ description: '팀 순서' })
  order: number;

  static async makeRes(data: Member) {
    const resData = new MemberMetaResDto();

    resData.color = data.color;
    resData.order = data.order;

    return resData;
  }
}
