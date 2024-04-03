import { Injectable } from '@nestjs/common';
import { Task, SubTask } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class TaskReposiotry extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findOneWithOptionOrFail(
    where: FindOptionsWhere<Task>,
    relations?: FindOptionsRelations<Task>,
    errorCode: string = 'task', // 나중에 에러 핸들러 제대로 구현하고 바꾸면 좋을듯
  ) {
    return this.findOneOrFail({ where, relations }).catch(() => {
      throw new Error(errorCode);
    });
  }

  // async findTaskDetailById(taskId: number): Promise<TaskResDto> {
  //   return this.createQueryBuilder('task')
  //     .leftJoinAndSelect('task.taskCategory', 'category_task')
  //     .leftJoinAndSelect('task.member', 'member')
  //     .leftJoinAndSelect('member.user', 'user')
  //     .where('task.id = :taskId', { taskId })
  //     .getOneOrFail()
  //     .then((data) => TaskResDto.makeRes(data))
  //     .catch(() => {
  //       throw new Error();
  //     });
  // }

  async findAllWithOption(
    // page: number,
    // take: number,
    where: FindOptionsWhere<Task>,
    relations?: FindOptionsRelations<Task>,
    order: FindOptionsOrder<Task> = { createdAt: 'DESC' },
    errorCode: string = 'task',
  ) {
    return this.findAndCount({
      // skip: page - 1 ?? 0,
      // take: take ?? 10,
      where,
      relations,
      order,
    }).catch(() => {
      throw new Error(errorCode);
    });
  }

  // async findTaskListWtihCount(
  //   // page: number,
  //   // pagingCount: number,
  //   where?: FindOptionsWhere<Task>,
  //   order?: FindOptionsOrder<Task>,
  // ): Promise<ListResDto<TaskListItemResDto>> {
  //   return this.findAndCount({
  //     where,
  //     order,
  //     // skip: page -1,
  //     // take: pagingCount,
  //     relations: {
  //       taskCategory: true,
  //       member: {
  //         user: true,
  //       },
  //     },
  //   })
  //     .then(([datas, count]) => ({
  //       dataList: datas.map((dt) => TaskListItemResDto.makeRes(dt)),
  //       totalCount: count,
  //     }))
  //     .catch(() => {
  //       throw new Error();
  //     });
  // }
}

@Injectable()
export class SubTaskRepository extends Repository<SubTask> {
  constructor(private dataSource: DataSource) {
    super(SubTask, dataSource.createEntityManager());
  }

  async findOneWithOptionOrFail(
    where: FindOptionsWhere<SubTask>,
    relations?: FindOptionsRelations<SubTask>,
    errorCode: string = 'subTask', // 나중에 에러 핸들러 제대로 구현하고 바꾸면 좋을듯
  ) {
    return this.findOneOrFail({ where, relations }).catch(() => {
      throw new Error(errorCode);
    });
  }

  async findAllWithOption(
    // page: number,
    // take: number,
    where: FindOptionsWhere<SubTask>,
    relations?: FindOptionsRelations<SubTask>,
    order: FindOptionsOrder<SubTask> = { createdAt: 'DESC' },
    errorCode: string = 'task',
  ) {
    return this.findAndCount({
      // skip: page - 1 ?? 0,
      // take: take ?? 10,
      where,
      relations,
      order,
    }).catch(() => {
      throw new Error(errorCode);
    });
  }
}
