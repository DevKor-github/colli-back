import { Injectable } from '@nestjs/common';
import { SubTaskRepository, TaskReposiotry } from './task.repository';
import { TaskResDto } from './dtos/taskRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { TaskListItemResDto } from './dtos/taskListItemRes.dto';
import { TaskReqDto } from './dtos/taskReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { SubTaskReqDto } from './dtos/subTaskReq.dto';
import { MoreThan } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskReposiotry,
    private readonly subTaskRepository: SubTaskRepository,
  ) {}

  async getTaskDetail(teamId: number, taskId: number): Promise<TaskResDto> {
    const task = await this.taskRepository
      .findOneWithOptionOrFail(
        {
          id: taskId,
          teamId,
        },
        { taskCategory: true, member: { user: true } },
      )
      .then((data) => TaskResDto.makeRes(data));
    //만약 subTask목록을 한방에 뽑을거라면 여기서 뽑아오면 될것 같음.

    return task;
  }

  async getTaskListByTeamIdAndState(
    teamId: number,
    state: number,
  ): Promise<ListResDto<TaskListItemResDto>> {
    return this.taskRepository
      .findAllWithOption(
        {
          teamId,
          state,
        },
        {
          taskCategory: true,
          member: {
            user: true,
          },
        },
      )
      .then(([datas, count]) => ({
        dataList: datas.map((dt) => TaskListItemResDto.makeRes(dt)),
        totalCount: count,
      }));
  }

  async addTask(req: TaskReqDto, teamId: number) {
    await this.taskRepository.insert({
      teamId,
      ...req,
    });
    return MsgResDto.ret();
  }

  async addSubTask(req: SubTaskReqDto, taskId: number) {
    await this.subTaskRepository.insert({
      taskId,
      ...req,
    });

    return MsgResDto.ret();
  }

  async modifyTask(
    req: TaskReqDto,
    teamId: number,
    taskId: number,
  ): Promise<MsgResDto> {
    await this.taskRepository.findOneWithOptionOrFail({
      id: taskId,
      teamId,
    });

    await this.taskRepository.update({ id: taskId, teamId }, { ...req });

    return MsgResDto.ret();
  }

  async modifySubTask(
    req: SubTaskReqDto,
    teamId: number,
    subTaskId: number,
  ): Promise<MsgResDto> {
    await this.subTaskRepository.findOneWithOptionOrFail({
      id: subTaskId,
      task: {
        teamId, //relation 필요없는지 확인해봐야함.
      },
    });

    await this.subTaskRepository.update(
      {
        id: subTaskId,
        task: {
          teamId,
        },
      },
      { ...req },
    );

    return MsgResDto.ret();
  }

  async removeTask(teamId: number, taskId: number): Promise<MsgResDto> {
    await this.taskRepository.findOneWithOptionOrFail({
      id: taskId,
      teamId,
    });

    await this.taskRepository.softRemove({ id: taskId, teamId });

    return MsgResDto.ret();
  }

  async removeSubTask(teamId: number, subTaskId: number): Promise<MsgResDto> {
    await this.subTaskRepository.findOneWithOptionOrFail({
      id: subTaskId,
      task: {
        teamId, //relation 필요없는지 확인해봐야함.
      },
    });

    await this.subTaskRepository.softRemove({
      id: subTaskId,
      task: { teamId },
    });

    return MsgResDto.ret();
  }

  async getUrgentTask(userId, criteria: Date): Promise<TaskResDto> {
    // 팀별로 가장 급한 task 하나씩 뽑기 - 이거말고 userId 받아와서 join한 다음에 task 전체를 두고 뽑는게 나을려나??
    const urgentTask = await this.taskRepository.find({
      take: 1,
      where: {
        state: 1,
        deadline: MoreThan(criteria),
        member: {
          userId,
        },
      },
      relations: {
        member: true,
      },
      order: {
        deadline: 'DESC',
      },
    });

    if (!urgentTask.length) return TaskResDto.empty();

    return TaskResDto.makeRes(urgentTask[0]);
  }
}
