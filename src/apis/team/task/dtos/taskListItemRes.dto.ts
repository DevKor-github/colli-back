import { ApiProperty } from '@nestjs/swagger';
import { DateResDto } from 'src/common/dto/dateRes.dto';
import { Task } from 'src/entities';

export class TaskListItemResDto extends DateResDto {
  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '카테고리' })
  category: string;

  @ApiProperty({ description: '담당자' })
  assignee: string;

  @ApiProperty({ description: '마감기한' })
  deadline: Date;

  static makeRes(data: Task) {
    const resData = new TaskListItemResDto();

    resData.title = data.title;
    resData.category = data.taskCategory.categoryName;
    resData.assignee = data.member.user.name;
    resData.deadline = data.deadline;
    resData.createdAt = data.createdAt;
    resData.updatedAt = data.updatedAt;
    resData.deletedAt = data.deletedAt;

    return resData;
  }
}
