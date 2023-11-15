import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ModifyProfileReqDto {
  @IsString()
  @ApiProperty({ description: '전화번호' })
  phoneNum: string;
}
