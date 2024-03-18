import { ApiProperty } from '@nestjs/swagger';
// import { ListResDto } from 'src/common/dto/listRes.dto';
import { Task, User } from 'src/entities';

export class TaskDetailResDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '설명' })
  content: string;

  //카테고리 id로 join해서 string 받아오기
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

  @ApiProperty({ description: '작성 날짜' })
  createdAt: Date;

  // 뭐가 더 나을지 잘 모르겠네
  // @ApiProperty({ description: '하위 태스크 목록' })
  // subTaskList: ListResDto<>;

  static makeRes(data: Task) {
    const resData = new TaskDetailResDto();

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
    return new TaskDetailResDto();
  }
}
