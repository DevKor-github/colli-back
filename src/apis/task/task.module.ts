import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamTaskReposiotry, UserTaskReposiotry } from './task.repository';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTaskReposiotry, TeamTaskReposiotry])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
