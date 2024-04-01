import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { NoticeReqDto } from './dto/noticeReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { NoticeResDto } from './dto/noticeRes.dto';

@ApiTags('notice')
@Controller()
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('/:noticeId')
  @ApiOkResponse({ description: '팀 공지 상세 조회' })
  async getNoticeDetial(
    @Param('teamId') teamId: number,
    @Param('noticeId') noticeId: number,
  ): Promise<NoticeResDto> {
    try {
      return this.noticeService.getNoticeDetail(teamId, noticeId);
    } catch (err) {
      throw err;
    }
  }

  @Get('/list')
  @ApiOkResponse({ description: '팀 공지 목록 조회' })
  async getNoticeList(
    @Param('teamId') teamId: number,
  ): Promise<ListResDto<NoticeResDto>> {
    try {
      return this.noticeService.getTeamNoticeList(teamId);
    } catch (err) {
      throw err;
    }
  }

  @Post('/add')
  @ApiOkResponse({ description: '팀 공지 추가' })
  async addNotice(
    @Body() noticeReqDto: NoticeReqDto,
    @Param('teamId') teamId: number,
  ): Promise<MsgResDto> {
    try {
      return this.noticeService.addNotice(noticeReqDto, teamId);
    } catch (err) {
      throw err;
    }
  }

  @Patch('/:noticeId/modify')
  @ApiOkResponse({ description: '팀 공지 수정' })
  async modifyNotice(
    @Body() noticeReqDto: NoticeReqDto,
    @Param('teamId') teamId: number,
    @Param('noticeId') noticeId: number,
  ): Promise<MsgResDto> {
    try {
      return this.noticeService.modifyNotice(noticeReqDto, teamId, noticeId);
    } catch (err) {
      throw err;
    }
  }

  @Delete()
  @ApiOkResponse({ description: '팀 공지 삭제' })
  async removeNotice(
    @Param('teamId') teamId: number,
    @Param('noticeId') noticeId: number,
  ): Promise<MsgResDto> {
    try {
      return this.noticeService.removeNotice(teamId, noticeId);
    } catch (err) {
      throw err;
    }
  }
}
