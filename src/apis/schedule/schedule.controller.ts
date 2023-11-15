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
import { ScheduleService } from './schedule.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/team/:scheduleId/:tokenId')
  @ApiOkResponse({ description: '팀 일정 상세 조회' })
  async getTeamScehduleDetail(
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {}

  @Get('/calendar/team/:teamId/:tokenId')
  @ApiOkResponse({ description: '팀 캘린더 조회' })
  async getTeamCalendar(
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
    @Query('month') month: number,
    @Query('week') week?: number, //week로 받을지, 시작날짜 종료날짜로 받을지 좀더 고민
  ) {}

  @Post('/team/add')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 추가' })
  async addTeamSchedule(@Body() addTeamScheduleReqDto) {}

  @Patch('/team/modify/:scheduleId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 수정' })
  async modifyTeamSchedule(
    @Param('scheduleId') scheduleId,
    @Body() modifyTeamScheduleReqDto,
  ) {}

  @Delete('/team/remove/:teamId/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '팀 일정 삭제' })
  async removeTeamSchedule(
    @Param('teamId') teamId: number,
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {}

  // 아래는 유저 페이지

  @Get('/user/:scheduleId/:tokenId')
  @ApiOkResponse({ description: '개인 일정 상세 조회' })
  async getUserScehduleDetail(
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {}

  @Get('/calendar/user/:tokenId')
  @ApiOkResponse({ description: '개인 캘린더 조회' })
  async getUserCalendar(
    @Param('tokenId') tokenId: number,
    @Query('month') month: number,
    @Query('week') week?: number, //week로 받을지, 시작날짜 종료날짜로 받을지 좀더 고민
  ) {}

  @Post('/user/add')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 추가' })
  async addUserSchedule(@Body() addUserScheduleReqDto) {}

  @Patch('/user/modify/:scheduleId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 수정' })
  async modifyUserSchedule(
    @Param('scheduleId') scheduleId,
    @Body() modifyUserScheduleReqDto,
  ) {}

  @Delete('/user/remove/:scheduleId/:tokenId')
  @ApiOkResponse({ type: MsgResDto, description: '개인 일정 삭제' })
  async removeUserSchedule(
    @Param('scheduleId') scheduleId: number,
    @Param('tokenId') tokenId: number,
  ) {}
}
