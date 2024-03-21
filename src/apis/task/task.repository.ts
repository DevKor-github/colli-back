import { Injectable } from '@nestjs/common';
import { Task } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TaskReposiotry extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
