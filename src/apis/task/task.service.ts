import { Injectable } from '@nestjs/common';
import { TaskReposiotry } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskReposiotry) {}
}
