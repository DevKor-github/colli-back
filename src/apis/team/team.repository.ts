import { Injectable } from '@nestjs/common';
import { Team } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
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
}
