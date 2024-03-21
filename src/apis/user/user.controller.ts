import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileResDto } from './dto/getProfileRes.dto';
import { ModifyProfileReqDto } from './dto/modifyProfileReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskDetailResDto } from '../team/task/dtos/taskDetailRes.dto';
import { TaskService } from '../team/task/task.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get('/my')
  async getMyProfile(
    @Param('tokenId') tokenId: number, // 본인 유저id값
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(tokenId);
  }

  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(userId);
  }

  @Patch('/profile/modify')
  async modifyProfile(
    @Param('tokenId') tokenId: number,
    @Body() modifyProfileReqDto: ModifyProfileReqDto,
  ): Promise<MsgResDto> {
    return this.userService.modifyUser(tokenId, modifyProfileReqDto);
  }

  @Get('/urgentTask')
  @ApiOkResponse({ description: '가장 급한 과제' })
  async getUrgentTask(userId: number): Promise<TaskDetailResDto> {
    try {
      // 가입한 팀의 memberId 배열
      // const joinList = await this.memberService.getUserBelongingList(userId);
      return this.taskService.getUrgentTask(userId, new Date());
    } catch (err) {
      throw err;
    }
  }

  @Get('/urgentSchedule')
  @ApiOkResponse({ description: '가장 급한 일정' })
  async getUrgentSchedule() {
    try {
    } catch (err) {
      throw err;
    }
  }

  @Get('/notice/listbyteam')
  @ApiOkResponse({ description: '팀별 공지 목록?' })
  async getNoticeListByTeam() {
    try {
    } catch (err) {}
  }
}
