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
import { TaskResDto } from './dtos/taskRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { TaskListItemResDto } from './dtos/taskListItemRes.dto';
import { TaskReqDto } from './dtos/taskReq.dto';
import { SubTaskReqDto } from './dtos/subTaskReq.dto';
import { SubTaskResDto } from './dtos/subTaskRes.dto';
// import { MemberService } from '../member/member.service';

@ApiTags('task')
@Controller()
export class TaskController {
  constructor(
    private readonly taskService: TaskService, // private readonly memberService: MemberService,
  ) {}

  //하위태스크 목록만 refresh가능하게 한다면 api 분리가 낫고 그게 아니면 그냥 합치는게 나을 것 같긴함.
  @Get('/:taskId')
  @ApiOkResponse({ type: TaskResDto, description: '태스크 상세 조회' })
  async getTaskDetail(
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
  ): Promise<TaskResDto> {
    try {
      return this.taskService.getTaskDetail(teamId, taskId);
    } catch (err) {
      throw err;
    }
  }

  @Get('/sub/:subTaskId')
  @ApiOkResponse({ type: SubTaskResDto, description: '하위 태스크 상세 조회' })
  async getSubTaskDetail(
    @Param('teamId') teamId: number,
    @Param('subTaskId') subTaskId: number,
  ): Promise<SubTaskResDto> {
    try {
      return this.taskService.getSubTaskDetail(teamId, subTaskId);
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
  async getTaskListByTeam(
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

  @Get('/:taskId/sub/list')
  @ApiOkResponse({ description: '하위 태스크 목록 조회' })
  async getSubTaskListByTask(
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
  ): Promise<ListResDto<SubTaskResDto>> {
    try {
      return this.taskService.getSubTaskListByTeamIdAndTaskId(teamId, taskId);
    } catch (err) {
      throw err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  // 라우팅 수정하면 /team/teamId/task/add
  @Post('/add')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 추가' })
  async addTask(
    @Body() addTaskReqDto: TaskReqDto,
    @Param('teamId') teamId: number,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.addTask(addTaskReqDto, teamId);
    } catch (err) {
      throw err;
    }
  }

  @Post('/sub/add')
  @ApiOkResponse({ type: MsgResDto, description: '태스크 하위 목록 추가' })
  async addSubTask(
    @Body() addSubTaskReqDto: SubTaskReqDto,
    @Param('teamId') teamId: number,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.addSubTask(addSubTaskReqDto, teamId);
    } catch (err) {
      throw err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  // 라우팅 수정하면 /team/teamId/task/modify/taskId
  @Patch('/:taskId/modify')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 수정' })
  async modifyTask(
    @Body() modifyTaskReqDto: TaskReqDto,
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.modifyTask(modifyTaskReqDto, teamId, taskId);
    } catch (err) {
      throw err;
    }
  }

  // 라우팅 수정하면 /team/teamId/task/modifySub/subTaskId
  @Patch('/sub/:subTaskId/modify')
  @ApiOkResponse({ type: MsgResDto, description: '서브 태스크 수정' })
  async modifySubTask(
    @Body() modifySubTaskReqDto: SubTaskReqDto,
    @Param('teamId') teamId: number,
    @Param('subTaskId') subTaskId: number,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.modifySubTask(
        modifySubTaskReqDto,
        teamId,
        subTaskId,
      );
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
  ): Promise<MsgResDto> {
    try {
      return this.taskService.removeTask(teamId, taskId);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/sub/:subTaskId/remove')
  @ApiOkResponse({ type: MsgResDto, description: '서브 태스크 삭제' })
  async removeSubTask(
    @Param('teamId') teamId: number,
    @Param('subTaskId') subTaskId: number,
  ): Promise<MsgResDto> {
    try {
      return this.taskService.removeSubTask(teamId, subTaskId);
    } catch (err) {
      throw err;
    }
  }
}
