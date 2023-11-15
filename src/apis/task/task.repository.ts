import { Injectable } from '@nestjs/common';
import { TeamTask, UserTask } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserTaskReposiotry extends Repository<UserTask> {}

@Injectable()
export class TeamTaskReposiotry extends Repository<TeamTask> {}
