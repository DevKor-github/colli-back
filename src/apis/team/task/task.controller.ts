import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { TaskDetailResDto } from './dtos/taskDetailRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { TaskListItemResDto } from './dtos/taskListItemRes.dto';
import { TaskReqDto } from './dtos/taskReq.dto';
import { SubTaskReqDto } from './dtos/subTaskReq.dto';
// import { MemberService } from '../member/member.service';

// 일단 개인/팀 태스크 api 싹 분리해보자
@ApiTags('task')
@Controller()
export class TaskController {
  constructor(
    private readonly taskService: TaskService, // private readonly memberService: MemberService,
  ) {}

  //하위태스크 목록만 refresh가능하게 한다면 api 분리가 낫고 그게 아니면 그냥 합치는게 나을 것 같긴함.
  @Get('/:taskId')
  @ApiOkResponse({ type: TaskDetailResDto, description: '태스크 상세 조회' })
  async getTaskDetail(
    @Param('taskId') taskId: number,
  ): Promise<TaskDetailResDto> {
    try {
      return this.taskService.getTaskDetail(taskId);
    } catch (err) {
      throw err;
    }
  }

  // 조회하는 사람이 팀에 속한 멤버인지 검증하는 로직 필요
  @Get('/list')
  @ApiOkResponse({
    type: ListResDto,
    description: '태스크 목록 조회',
  })
  async getTaskListByTeamIdAndState(
    @Param('teamId') teamId: number,
    @Query('state') state: string,
  ): Promise<ListResDto<TaskListItemResDto>> {
    try {
      if (state == 'todo')
        return this.taskService.getTaskListByTeamIdAndState(teamId, 0);
      else if (state == 'done')
        return this.taskService.getTaskListByTeamIdAndState(teamId, 2);
      else return this.taskService.getTaskListByTeamIdAndState(teamId, 1);
    } catch (err) {
      throw err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  // 라우팅 수정하면 /team/teamId/task/add
  @Post('/add')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 추가' })
  async addTask(
    @Param('teamId') teamId: number,
    @Body() addTaskReqDto: TaskReqDto,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.addTask(teamId, addTaskReqDto);
    } catch (err) {
      throw err;
    }
  }

  // 라우팅 수정하면 /team/teamId/task/taskId/addSub
  @Post('/:taskId/sub/add')
  @ApiOkResponse({ type: MsgResDto, description: '태스크 하위 목록 추가' })
  async addSubTask(
    // teamId를 쓸 일이 있을까?
    // @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
    @Body() addSubTaskReqDto: SubTaskReqDto,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.addSubTask(taskId, addSubTaskReqDto);
    } catch (err) {
      throw err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  // 라우팅 수정하면 /team/teamId/task/modify/taskId
  @Patch('/:taskId/modify')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 수정' })
  async modifyTask(
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
    @Body() modifyTaskReqDto: TaskReqDto,
  ) {
    try {
      return this.taskService.modifyTask(teamId, taskId, modifyTaskReqDto);
    } catch (err) {
      throw err;
    }
  }

  // 라우팅 수정하면 /team/teamId/task/modifySub/subTaskId
  @Patch('/sub/:subTaskId/modify')
  @ApiOkResponse({ type: MsgResDto, description: '서브 태스크 수정' })
  async modifySubTask(
    @Param('subTaskId') subTaskId: number,
    @Body() modifySubTaskReqDto: SubTaskReqDto,
  ) {
    try {
      return this.taskService.modifySubTask(subTaskId, modifySubTaskReqDto);
    } catch (err) {
      throw err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  @Delete('/:taskId/remove')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 삭제' })
  async removeTask(
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
  ) {
    try {
      return this.taskService.removeTask(taskId);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/sub/:subTaskId/remove')
  @ApiOkResponse({ type: MsgResDto, description: '서브 태스크 삭제' })
  async removeSubTask(@Param('subTaskId') subTaskId: number) {
    try {
      return this.taskService.removeSubTask(subTaskId);
    } catch (err) {
      throw err;
    }
  }
}
