import { ApiProperty } from '@nestjs/swagger';
import User from 'src/entities/User';

export class GetProfileResDto {
  @ApiProperty({ name: '이름' })
  name: string;

  @ApiProperty({ name: '대학' })
  university: string;

  @ApiProperty({ name: '학과' })
  department: string;

  @ApiProperty({ name: '학번' })
  univNum: string;

  @ApiProperty({ name: '평가' })
  evaluation: number;

  static async makeRes(data: User) {
    const { name, university, department, univNum, evaluation } = data;

    const resData = new GetProfileResDto();
    resData.name = name;
    resData.university = university;
    resData.department = department;
    resData.univNum = univNum;
    resData.evaluation = evaluation;

    return resData;
  }
}
