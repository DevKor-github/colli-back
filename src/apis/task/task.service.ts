import { Injectable } from '@nestjs/common';
import { TeamTaskReposiotry, UserTaskReposiotry } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly userTaskRepository: UserTaskReposiotry,
    private readonly teamTaskRepository: TeamTaskReposiotry,
  ) {}
}
