import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SubTaskRepository, TaskReposiotry } from './task.repository';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, TaskReposiotry, SubTaskRepository],
  exports: [TaskService],
})
export class TaskModule {}
