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

// 일단 개인/팀 태스크 api 싹 분리해보자
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //하위태스크 목록만 refresh가능하게 한다면 api 분리가 낫고 그게 아니면 그냥 합치는게 나을 것 같긴함.
  @Get('/team/:taskId')
  @ApiOkResponse({ type: TaskDetailResDto, description: '태스크 상세 조회' })
  async getTaskDetail(
    @Param('taskId') taskId: number,
  ): Promise<TaskDetailResDto> {
    return this.taskService.getTaskDetail(taskId);
  }

  // 조회하는 사람이 팀에 속한 멤버인지 검증하는 로직 필요
  @Get('/list/team/:teamId')
  @ApiOkResponse({
    type: ListResDto,
    description: '태스크 목록 조회(팀 페이지)',
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
      return err;
    }
  }

  // 팀에 속한 멤버인지검증 필요
  @Post('/team/add')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 추가' })
  async addTask(@Body() addTaskReqDto) {}

  // 팀에 속한 멤버인지검증 필요
  @Patch('/team/modify/:taskId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 수정' })
  async modifyTask(
    @Param('taskId') taskId: number,
    @Body() modifyTeamTaskReqDto,
  ) {}

  // 팀에 속한 멤버인지검증 필요
  @Delete('team/remove/:teamId/:taskId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 태스크 삭제' })
  async removeTask(
    @Param('teamId') teamId: number,
    @Param('taskId') taskId: number,
    @Param('tokenId') tokenId: number,
  ) {}

  /*
  // 여기 아래 부터는 유저 페이지에서만 호출하는 api
  @Get('/user/:taskId/:tokenId')
  @ApiOkResponse({ description: '개인 태스크 상세 조회' })
  async getUserTaskDetail(@Param('taskId') taskId: number) {}

  // 할당 받은 팀 태스크와 개인이 추가한 유저 태스크를 동시에 보여줄 수 있어야 한다.
  // 유저 태스크일 경우 teamId를 null로 전달한다면... 이건 좋을듯
  @Get('/list/user/:tokenId')
  @ApiOkResponse({ description: '태스크 목록 조회(유저 페이지)' })
  async getTaskListByUserId(
    @Param('tokenId') tokenId: number,
    @Query('isComplete') isComplete: boolean,
    @Query('teamId') teamId?: number,
  ) {}

  // 개인 태스크 다루는 작업할 때, tokenId는 body에 넣기
  // 애초에 버튼이 다르다 -> api 따로 파두자
  // delete는 body에 못넣으니 url에 적기
  @Post('/user/add')
  @ApiOkResponse({ type: MsgResDto, description: '개인 태스크 추가' })
  async addUserTask(@Body() addUserTaskReqDto) {}

  // body에 들어있는 tokenId로 task의 주인이 맞는지 검증 로직 필요
  @Patch('/user/modify/:taskId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 태스크 수정' })
  async modifyUserTask(
    @Param('taskId') taskId: number,
    @Body() modifyUserTaskReqDto,
  ) {}

  // tokenId로 태스크의 주인이 맞는지 검증 필요
  @Delete('/user/remove/:taskId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 태스크 삭제' })
  async removeUserTask(
    @Param('taskId') taskId: number,
    @Param('tokenId') tokenId: number,
  ) {}
  */
}
