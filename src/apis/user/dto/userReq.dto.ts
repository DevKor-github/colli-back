import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserReqDto {
  @IsString()
  @ApiProperty({ description: '전화번호' })
  phoneNum: string;
}
