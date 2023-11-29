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
import { ApiOkResponse } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { MemberService } from '../member/member.service';
import { ScheduleResDto } from './dto/scheduleRes.dto';
import { GetCalendarReqDto } from './dto/getCalendarReq.dto';
import { ScheduleReqDto } from './dto/scheduleReq.dto';
import { UserService } from '../user/user.service';

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
    const { color } = await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getScheduleDetail(scheduleId, true, color);
  }

  @Post('/calendar/team/:teamId/:tokenId')
  @ApiOkResponse({ description: '팀 캘린더 조회' })
  async getTeamCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<{ dataList: number[] }> {
    const { color } = await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getTeamCalendar(
      teamId,
      getCalendarReqDto,
      color,
    );
  }

  @Post('/date/team/:teamId/:tokenId')
  @ApiOkResponse({ description: '팀 캘린더 날짜별 일정 조회' })
  async getTeamDateCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ) {
    const { color } = await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.getTeamDateCalendar(
      teamId,
      getCalendarReqDto,
      color,
    );
  }

  @Post('/team/:teamId/add/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 추가' })
  async addTeamSchedule(
    @Body() addTeamScheduleReqDto: ScheduleReqDto,
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ) {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.addSchedule(
      addTeamScheduleReqDto,
      true, //isTeam
      teamId,
    );
  }

  @Patch('/team/:teamId/modify/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 수정' })
  async modifyTeamSchedule(
    @Body() modifyTeamScheduleReqDto: ScheduleReqDto,
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.modifySchedule(
      modifyTeamScheduleReqDto,
      scheduleId,
      true, //isTeam
      teamId,
    );
  }

  @Delete('/team/:teamId/remove/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 삭제' })
  async removeTeamSchedule(
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.scheduleService.removeScheule(scheduleId, true, teamId);
  }

  // 아래는 유저 페이지

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
  @ApiOkResponse({ description: '개인 캘린더 조회' })
  async getUserCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('tokenId') tokenId: number,
  ): Promise<{ dataList: number[] }> {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.getUserCalendar(tokenId, getCalendarReqDto);
  }

  @Post('/date/user/:tokenId')
  @ApiOkResponse({ description: '팀 캘린더 날짜별 일정 조회' })
  async getUserDateCalendar(
    @Body() getCalendarReqDto: GetCalendarReqDto,
    @Param('tokenId') tokenId: number,
  ) {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.getUserDateCalendar(tokenId, getCalendarReqDto);
  }

  @Post('/user/add/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 추가' })
  async addUserSchedule(
    @Body() addUserScheduleReqDto: ScheduleReqDto,
    @Param('tokenId') tokenId: number,
  ) {
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
  ) {
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
  ) {
    await this.userService.getUserProfile(tokenId);

    return this.scheduleService.removeScheule(scheduleId, false, tokenId);
  }
}
