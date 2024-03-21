import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/entities';

export class TaskListItemResDto {
  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '카테고리' })
  category: string;

  @ApiProperty({ description: '담당자' })
  assignee: string;

  @ApiProperty({ description: '마감기한' })
  deadline: Date;

  @ApiProperty({ description: '작성 일자' })
  createdAt: Date;

  static makeRes(data: Task) {
    const resData = new TaskListItemResDto();

    resData.title = data.title;
    resData.category = data.taskCategory.categoryName;
    resData.assignee = data.member.user.name;
    resData.deadline = data.deadline;
    resData.createdAt = data.createdAt;

    return resData;
  }
}
