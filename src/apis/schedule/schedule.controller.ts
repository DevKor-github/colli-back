import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { MemberService } from '../member/member.service';
import { ScheduleResDto } from './dto/scheduleRes.dto';
import { GetCalendarReqDto } from './dto/getCalendarReq.dto';
import { ScheduleReqDto } from './dto/scheduleReq.dto';
import { UserService } from '../user/user.service';
import { CalendarCountResDto } from './dto/calendarCountRes.dto';
import { DateCalendarResDto } from './dto/dateCalendarRes.dto';

// 결국에 team/teamId를 빼내는 라우팅으로 변경을 하는게 맞을거 같음
@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly memberService: MemberService,
    private readonly userService: UserService,
  ) {}

  @Get('/team/:teamId/:scheduleId/:tokenId')
  @ApiOkResponse({ type: ScheduleResDto, description: '팀 일정 상세 조회' })
  async getTeamScehduleDetail(
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<ScheduleResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getScheduleDetail(scheduleId);
  }

  @Post('/calendar/team/:teamId/:tokenId')
  @ApiOkResponse({ type: CalendarCountResDto, description: '팀 캘린더 조회' })
  async getTeamCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<{ dataList: number[] }> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getScheduleCalendar(teamId, getCalendarReqDto);
  }

  @Post('/date/team/:teamId/:tokenId')
  @ApiOkResponse({
    type: DateCalendarResDto,
    description: '팀 캘린더 날짜별 일정 조회',
  })
  async getTeamDateCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<DateCalendarResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getScheduleDateCalendar(
      teamId,
      getCalendarReqDto,
    );
  }

  @Post('/team/:teamId/add/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 추가' })
  async addTeamSchedule(
    @Body() addTeamScheduleReqDto: ScheduleReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<MsgResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.addSchedule(addTeamScheduleReqDto, teamId);
  }

  @Patch('/team/:teamId/modify/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 수정' })
  async modifyTeamSchedule(
    @Body() modifyTeamScheduleReqDto: ScheduleReqDto,
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<MsgResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.modifySchedule(
      modifyTeamScheduleReqDto,
      scheduleId,
      teamId,
    );
  }

  @Delete('/team/:teamId/remove/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 삭제' })
  async removeTeamSchedule(
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<MsgResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.removeScheule(scheduleId, teamId);
  }

  // 아래는 유저 페이지
  /*
  @Get('/user/:scheduleId/:tokenId')
  @ApiOkResponse({ description: '개인 일정 상세 조회' })
  async getUserScehduleDetail(
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.getScheduleDetail(scheduleId, false);
  }

  @Post('/calendar/user/:tokenId')
  @ApiOkResponse({ type: CalendarCountResDto, description: '개인 캘린더 조회' })
  async getUserCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('tokenId') tokenId: number,
  ): Promise<CalendarCountResDto> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.getUserCalendar(tokenId, getCalendarReqDto);
  }

  @Post('/date/user/:tokenId')
  @ApiOkResponse({
    type: MergedDateCalendarResDto,
    description: '개인 캘린더 날짜별 일정 조회',
  })
  async getUserDateCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('tokenId') tokenId: number,
  ): Promise<MergedDateCalendarResDto> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.getUserDateCalendar(tokenId, getCalendarReqDto);
  }

  @Post('/user/add/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 추가' })
  async addUserSchedule(
    @Body() addUserScheduleReqDto: ScheduleReqDto,
    @Param('tokenId') tokenId: number,
  ): Promise<MsgResDto> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.addSchedule(
      addUserScheduleReqDto,
      false, //isTeam
      tokenId,
    );
  }

  @Patch('/user/modify/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 수정' })
  async modifyUserSchedule(
    @Param('scheduleId') scheduleId,
    @Param('tokenId') tokenId: number,
    @Body() modifyUserScheduleReqDto: ScheduleReqDto,
  ): Promise<MsgResDto> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.modifySchedule(
      modifyUserScheduleReqDto,
      scheduleId,
      false, //isTeam
      tokenId,
    );
  }

  @Delete('/user/remove/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 삭제' })
  async removeUserSchedule(
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<MsgResDto> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.removeScheule(scheduleId, false, tokenId);
  }
  */
}
