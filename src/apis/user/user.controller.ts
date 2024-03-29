import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileResDto } from './dto/getProfileRes.dto';
import { ModifyProfileReqDto } from './dto/modifyProfileReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskDetailResDto } from '../team/task/dtos/taskDetailRes.dto';
import { TaskService } from '../team/task/task.service';
import { MemberService } from '../team/member/member.service';
import { NoticeService } from '../team/notice/notice.service';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { NoticeResDto } from '../team/notice/dto/noticeRes.dto';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private readonly taskService: TaskService,
    private readonly noticeService: NoticeService,
  ) {}

  @Get('/my')
  async getMyProfile(
    userId: number, // 본인 유저id값
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(userId);
  }

  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(userId);
  }

  @Patch('/profile/modify')
  async modifyProfile(
    userId: number,
    @Body() modifyProfileReqDto: ModifyProfileReqDto,
  ): Promise<MsgResDto> {
    return this.userService.modifyUser(userId, modifyProfileReqDto);
  }

  @Get('/task/urgent')
  @ApiOkResponse({ description: '가장 급한 과제' })
  async getUrgentTask(userId: number): Promise<TaskDetailResDto> {
    try {
      return this.taskService.getUrgentTask(userId, new Date());
    } catch (err) {
      throw err;
    }
  }

  @Get('/schedule/urgent')
  @ApiOkResponse({ description: '가장 급한 일정' })
  async getUrgentSchedule() {
    try {
    } catch (err) {
      throw err;
    }
  }

  @Get('/notice/latest')
  @ApiOkResponse({ description: '팀별 최신 공지 목록' })
  async getLatestNoticeListOfjoinedTeam(
    userId: number,
  ): Promise<ListResDto<NoticeResDto>> {
    try {
      const { dataList } = await this.memberService.getAllMembersByJoinId(
        'user',
        userId,
      );
      return this.noticeService.getLatestNoticeOfJoinedTeam(
        dataList.map((data) => data.teamId),
      );
    } catch (err) {
      throw err;
    }
  }
}
