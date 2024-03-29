import { Member } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { Injectable } from '@nestjs/common';
import { MemberMetaResDto } from './dto/memberMetaRes.dto';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(private dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  async findOneWithOptionOrFail(where: FindOptionsWhere<Member>) {
    return this.findOneByOrFail(where)
      .then((data) => MemberMetaResDto.makeRes(data))
      .catch(() => {
        throw new Error();
      });
  }

  // 날려야 할거
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

  async findAllWithOption(
    // page: number,
    // take: number,
    where: FindOptionsWhere<Member>,
    relations?: FindOptionsRelations<Member>,
    order: FindOptionsOrder<Member> = { createdAt: 'DESC' },
    errorCode: string = 'member',
  ) {
    return this.findAndCount({
      // skip: page - 1 ?? 0,
      // take: take ?? 10,
      where,
      relations,
      order,
    }).catch(() => {
      throw new Error(errorCode);
    });
  }
}
