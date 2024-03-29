import { Injectable } from '@nestjs/common';
import { SubTaskRepository, TaskReposiotry } from './task.repository';
import { TaskDetailResDto } from './dtos/taskDetailRes.dto';
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

  async getTaskDetail(taskId: number): Promise<TaskDetailResDto> {
    const task = await this.taskRepository.findTaskDetailById(taskId);

    //만약 subTask목록을 한방에 뽑을거라면 여기서 뽑아오면 될것 같음.

    return task;
  }

  async getTaskListByTeamIdAndState(
    teamId: number,
    state: number,
  ): Promise<ListResDto<TaskListItemResDto>> {
    const tasks = await this.taskRepository.findTaskListWtihCount({
      teamId,
      state,
    });

    return tasks;
  }

  async addTask(teamId: number, req: TaskReqDto) {
    await this.taskRepository.insert({
      teamId,
      ...req,
    });
    return MsgResDto.ret();
  }

  async addSubTask(taskId: number, req: SubTaskReqDto) {
    await this.subTaskRepository.insert({
      taskId,
      ...req,
    });

    return MsgResDto.ret();
  }

  async modifyTask(
    teamId: number,
    taskId: number,
    req: TaskReqDto,
  ): Promise<MsgResDto> {
    // 수정 대상 확인
    await this.taskRepository.findOneByOrFail({ id: taskId }).catch(() => {
      throw Error();
    });

    await this.taskRepository.update({ id: taskId }, { ...req });

    return MsgResDto.ret();
  }

  async modifySubTask(
    subTaskId: number,
    req: SubTaskReqDto,
  ): Promise<MsgResDto> {
    await this.subTaskRepository
      .findOneByOrFail({ id: subTaskId })
      .catch(() => {
        throw Error();
      });

    await this.subTaskRepository.update({ id: subTaskId }, { ...req });

    return MsgResDto.ret();
  }

  // memberId를 위에서 들고내려올 수 있을까?
  // 애초에 api 실행 시작때, 관리자거나 담당자가 아니면 태스크를 삭제하지 못하게 막아버린다면? 굳이 멤버검증이 필요할까
  async removeTask(taskId: number): Promise<MsgResDto> {
    await this.taskRepository
      .findOneByOrFail({ id: taskId /*, memberId*/ })
      .catch(() => {
        throw Error();
      });

    await this.taskRepository.softRemove({ id: taskId });

    return MsgResDto.ret();
  }

  async removeSubTask(
    subTaskId: number,
    memberId?: number,
  ): Promise<MsgResDto> {
    await this.subTaskRepository
      .findOneOrFail({
        relations: { task: true },
        where: {
          id: subTaskId,
          // task: {
          //   memberId,
          // },
        },
      })
      .catch(() => {
        throw Error();
      });

    await this.subTaskRepository.softRemove({ id: subTaskId });

    return MsgResDto.ret();
  }

  async getUrgentTask(userId, criteria: Date): Promise<TaskDetailResDto> {
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

    if (!urgentTask.length) return TaskDetailResDto.empty();

    return TaskDetailResDto.makeRes(urgentTask[0]);
  }
}
