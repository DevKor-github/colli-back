import { Injectable } from '@nestjs/common';
import { Team } from 'src/entities';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TeamResDto } from './dto/teamRes.dto';

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(private dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async findTeamDetail(teamId: number): Promise<TeamResDto> {
    return this.findOneByOrFail({ id: teamId }).then((data) =>
      TeamResDto.makeRes(data),
    );
  }

  async findOneWithOptionOrFail(
    where: FindOptionsWhere<Team>,
    relations?: FindOptionsRelations<Team>,
    errorCode: string = 'team', // 나중에 에러 핸들러 제대로 구현하고 바꾸면 좋을듯
  ) {
    return this.findOneOrFail({ where, relations }).catch(() => {
      throw new Error(errorCode);
    });
  }
}
