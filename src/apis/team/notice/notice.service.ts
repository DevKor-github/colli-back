import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';
import { NoticeResDto } from './dto/noticeRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { NoticeReqDto } from './dto/noticeReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async getNoticeDetail(
    teamId: number,
    noticeId: number,
  ): Promise<NoticeResDto> {
    return this.noticeRepository
      .findOneWithOptionOrFail({ id: noticeId, teamId })
      .then((data) => NoticeResDto.makeRes(data));
  }

  async getTeamNoticeList(teamId: number): Promise<ListResDto<NoticeResDto>> {
    return this.noticeRepository
      .findAllWithOption({ teamId }, { team: true })
      .then(([datas, count]) => ({
        dataList: datas.map((data) => NoticeResDto.makeRes(data)),
        totalCount: count,
      }));
  }

  async getLatestNoticeOfJoinedTeam(
    teamIds: number[],
  ): Promise<ListResDto<NoticeResDto>> {
    return this.noticeRepository
      .selectDistinctRow(teamIds)
      .then(([datas, count]) => ({
        dataList: datas.map((data) => NoticeResDto.makeRes(data)),
        totalCount: count,
      }));
  }

  async addNotice(req: NoticeReqDto, teamId: number) {
    return this.noticeRepository
      .insert({ teamId, ...req })
      .then(() => MsgResDto.ret());
  }

  async modifyNotice(req: NoticeReqDto, teamId: number, noticeId: number) {
    await this.noticeRepository.findOneWithOptionOrFail({
      id: noticeId,
      teamId,
    });

    return this.noticeRepository
      .update({ id: noticeId, teamId }, { ...req })
      .then(() => MsgResDto.ret());
  }

  async removeNotice(teamId: number, noticeId: number) {
    await this.noticeRepository.findOneWithOptionOrFail({
      id: noticeId,
      teamId,
    });

    return this.noticeRepository
      .softRemove({ id: noticeId, teamId })
      .then(() => MsgResDto.ret());
  }
}
