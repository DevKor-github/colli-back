import { ApiProperty } from '@nestjs/swagger';
import { DateResDto } from 'src/common/dto/dateRes.dto';
import { User } from 'src/entities';

export class UserResDto extends DateResDto {
  @ApiProperty({ name: '이름' })
  name: string;

  @ApiProperty({ name: '전화번호 ' })
  phoneNum: string;

  @ApiProperty({ name: '평가' })
  evaluation: number;

  static async makeRes(data: User) {
    const { name, phoneNum, evaluation } = data;

    const resData = new UserResDto();

    resData.name = name;
    resData.phoneNum = phoneNum;
    resData.evaluation = evaluation;
    resData.createdAt = data.createdAt;

    return resData;
  }
}
