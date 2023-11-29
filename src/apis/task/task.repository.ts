import { CustomRepository } from 'src/common/decorators/customRepository';
import { TeamTask, UserTask } from 'src/entities';
import { Repository } from 'typeorm';

@CustomRepository(UserTask)
export class UserTaskReposiotry extends Repository<UserTask> {}

@CustomRepository(TeamTask)
export class TeamTaskReposiotry extends Repository<TeamTask> {}
