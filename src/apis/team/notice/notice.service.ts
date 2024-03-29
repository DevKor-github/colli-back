import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';
import { NoticeResDto } from './dto/noticeRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async getNoticeDetail(noticeId: number): Promise<NoticeResDto> {
    return this.noticeRepository
      .findOneWithOptionOrFail({ id: noticeId })
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

  async addNotice() {}
  async modifyNotice() {}
  async removeNotice() {}
}
