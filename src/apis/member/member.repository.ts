import { Injectable } from '@nestjs/common';
import { Member } from 'src/entities';
import { Repository } from 'typeorm';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';

@Injectable()
export class MemberRepository extends Repository<Member> {
  async findAllMembersInTeam(
    teamId: number,
  ): Promise<ListResDto<GetMemberResDto>> {
    return this.findAndCount({
      where: { teamId },
      relations: { user: true },
    }).then(([data, count]) => ({
      dataList: data.map((e) => GetMemberResDto.makeRes(e)),
      totalCount: count,
    }));
  }
}
