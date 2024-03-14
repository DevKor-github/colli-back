import { Injectable } from '@nestjs/common';
import { SubTaskRepository, TaskReposiotry } from './task.repository';
import { TaskDetailResDto } from './dtos/taskDetailRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { TaskListItemResDto } from './dtos/taskListItemRes.dto';
import { TaskReqDto } from './dtos/taskReq.dto';
import { MemberService } from '../member/member.service';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { SubTaskReqDto } from './dtos/subTaskReq.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly memberService: MemberService,
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
    const { memberId } = req;
    // task할당해줄 담당자가 멤버인지 확인
    await this.memberService.checkIsMemberByMemberIdAndTeamId(memberId, teamId);

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
    const { memberId } = req;
    // 수정 대상 확인
    await this.taskRepository.findOneByOrFail({ id: taskId }).catch(() => {
      throw Error();
    });
    // task 할당자 멤버 여부 확인
    await this.memberService.checkIsMemberByMemberIdAndTeamId(memberId, teamId);

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
  async removeTask(taskId: number, memberId: number) {
    // 1. 가지고 내려온 memberId가 manager권한을 가지고 있는지 확인 -> 가지고 있으면 task가 존재하는지만 확인, 없으면 2번으로
    // 2. 담당 member인지 확인
    await this.taskRepository
      .findOneByOrFail({ id: taskId, memberId })
      .catch(() => {
        throw Error();
      });

    await this.taskRepository.softRemove({ id: taskId });

    return MsgResDto.ret();
  }

  async removeSubTask() {}
}
