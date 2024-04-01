import { ApiProperty } from '@nestjs/swagger';
import { DateResDto } from 'src/common/dto/dateRes.dto';
import { Notice } from 'src/entities';

export class NoticeResDto extends DateResDto {
  @ApiProperty({ description: '공지 id' })
  noticeId: number;

  @ApiProperty({ description: '팀 id' })
  teamId: number;

  @ApiProperty({ description: '팀 이름' })
  teamName: string;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '내용' })
  content: string;

  static makeRes(data: Notice) {
    const resData = new NoticeResDto();

    resData.noticeId = data.id;
    resData.teamId = data.teamId;
    resData.teamName = data.team.name;
    resData.title = data.title;
    resData.content = data.content;
    resData.createdAt = data.createdAt;
    resData.updatedAt = data.updatedAt;
    resData.deletedAt = data.deletedAt;

    return resData;
  }
}
