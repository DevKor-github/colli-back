import { Injectable } from '@nestjs/common';
import { Notice } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class NoticeRepository extends Repository<Notice> {
  constructor(private dataSource: DataSource) {
    super(Notice, dataSource.createEntityManager());
  }

  async findOneWithOptionOrFail(
    where: FindOptionsWhere<Notice>,
    relations?: FindOptionsRelations<Notice>,
    errorCode: string = 'notice', // 나중에 에러 핸들러 제대로 구현하고 바꾸면 좋을듯
  ) {
    return this.findOneOrFail({ where, relations }).catch(() => {
      throw new Error(errorCode);
    });
  }

  async findAllWithOption(
    // page: number,
    // take: number,
    where: FindOptionsWhere<Notice>,
    relations?: FindOptionsRelations<Notice>,
    order: FindOptionsOrder<Notice> = { createdAt: 'DESC' },
    errorCode: string = 'notice',
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

  async selectDistinctRow(teamIds: number[]) {
    return this.createQueryBuilder('notice')
      .leftJoinAndSelect('notice.team', 'team')
      .distinctOn(['notice.teamId'])
      .where('notice.teamId IN (:...ids)', { ids: teamIds })
      .groupBy('notice.teamId')
      .orderBy('notice.createdAt', 'DESC')
      .getManyAndCount()
      .catch(() => {
        throw new Error();
      });
  }
}
