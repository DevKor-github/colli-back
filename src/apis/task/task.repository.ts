import { Injectable } from '@nestjs/common';
import { TeamTask, UserTask } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserTaskReposiotry extends Repository<UserTask> {
  constructor(private dataSource: DataSource) {
    super(UserTask, dataSource.createEntityManager());
  }
}

@Injectable()
export class TeamTaskReposiotry extends Repository<TeamTask> {
  constructor(private dataSource: DataSource) {
    super(TeamTask, dataSource.createEntityManager());
  }
}
