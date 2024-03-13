import { Injectable } from '@nestjs/common';
import { Task } from 'src/entities';
import { SubTask } from 'src/entities/SubTask';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TaskDetailResDto } from './dtos/taskDetailRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { TaskListItemResDto } from './dtos/taskListItemRes.dto';

@Injectable()
export class TaskReposiotry extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findTaskDetailById(taskId: number): Promise<TaskDetailResDto> {
    return this.createQueryBuilder('task')
      .leftJoinAndSelect('task.taskCategory', 'category_task')
      .leftJoinAndSelect('task.member', 'member')
      .leftJoinAndSelect('member.user', 'user')
      .where('task.id = :taskId', { taskId })
      .getOneOrFail()
      .then((data) => TaskDetailResDto.makeRes(data))
      .catch(() => {
        throw new Error();
      });
  }

  async findTaskListWtihCount(
    // page: number,
    // pagingCount: number,
    where?: FindOptionsWhere<Task>,
    order?: FindOptionsOrder<Task>,
  ): Promise<ListResDto<TaskListItemResDto>> {
    return this.findAndCount({
      where,
      order,
      // skip: page -1,
      // take: pagingCount,
      relations: {
        taskCategory: true,
        member: {
          user: true,
        },
      },
    })
      .then(([datas, count]) => ({
        dataList: datas.map((dt) => TaskListItemResDto.makeRes(dt)),
        totalCount: count,
      }))
      .catch(() => {
        throw new Error();
      });
    // return this.createQueryBuilder('task')
    //   .leftJoinAndSelect('task.taskCategory', 'category_task')
    //   .leftJoinAndSelect('task.member', 'member')
    //   .leftJoinAndSelect('member.user', 'user')
    //   .where('task.teamId = :teamId', { teamId })
    //   .andWhere('task.state = :state', { state })
    //   .getManyAndCount()
    //   .then(([datas, count]) => ({
    //     dataList: datas.map((dt) => TaskListItemResDto.makeRes(dt)),
    //     totalCount: count,
    //   }))
    //   .catch();
  }
}

@Injectable()
export class SubTaskRepository extends Repository<SubTask> {
  constructor(private dataSource: DataSource) {
    super(SubTask, dataSource.createEntityManager());
  }
}
