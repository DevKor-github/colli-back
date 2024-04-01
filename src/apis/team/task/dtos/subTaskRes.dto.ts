import { ApiProperty } from '@nestjs/swagger';
import { SubTask } from 'src/entities/SubTask';

export class SubTaskResDto {
  @ApiProperty({ description: '하위 태스크 id' })
  id: number;

  @ApiProperty({ description: '태스크 id' })
  taskId: number;

  @ApiProperty({ description: '소제목' })
  subTitle: string;

  @ApiProperty({ description: '내용' })
  content: string;

  static makeRes(data: SubTask) {
    const resData = new SubTaskResDto();

    resData.id = data.id;
    resData.taskId = data.taskId;
    resData.subTitle = data.subTitle;
    resData.content = data.content;

    return resData;
  }
}
