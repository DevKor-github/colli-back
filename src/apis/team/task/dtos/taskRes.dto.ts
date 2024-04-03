import { ApiProperty } from '@nestjs/swagger';
import { DateResDto } from 'src/common/dto/dateRes.dto';
// import { ListResDto } from 'src/common/dto/listRes.dto';
import { Task, User } from 'src/entities';

export class TaskResDto extends DateResDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '설명' })
  content: string;

  @ApiProperty({ description: '카테고리' })
  category: string;

  @ApiProperty({ description: '진행상태' })
  state: string;

  @ApiProperty({ description: '담당자' })
  assignee: User;

  @ApiProperty({ description: '마감기한' })
  deadline: Date;

  @ApiProperty({ description: '진행상태(%)' })
  progress: number;

  static makeRes(data: Task) {
    const resData = new TaskResDto();

    // 나중에 빼자 진짜 개같은 코드임 이거 -> enum으로 하면 좋을듯
    const stateArr = ['To do', 'In progress', 'Done'];

    resData.id = data.id;
    resData.title = data.title;
    resData.content = data.content;
    resData.category = data.taskCategory.categoryName;
    resData.state = stateArr[data.state];
    resData.assignee = data.member.user;
    resData.deadline = data.deadline;
    resData.progress = data.progress;
    resData.createdAt = data.createdAt;

    return resData;
  }

  static empty() {
    // 이거 잘 될라나? 결과 보고 이상하면 수정하자 귀찮다.
    return new TaskResDto();
  }
}
