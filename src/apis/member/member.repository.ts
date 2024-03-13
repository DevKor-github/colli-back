import { Member } from 'src/entities';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { Injectable } from '@nestjs/common';
import { MemberMetaResDto } from './dto/memberMetaRes.dto';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(private dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

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

  async findMemberByOptions(where: FindOptionsWhere<Member>) {
    return this.findOneByOrFail(where)
      .then((data) => MemberMetaResDto.makeRes(data))
      .catch(() => {
        throw new Error('소속된 팀이 아닙니다.');
      });
  }
}
