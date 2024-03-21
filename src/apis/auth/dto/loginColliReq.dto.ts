import { ApiProperty } from '@nestjs/swagger';

export class LoginColliReqDto {
  @ApiProperty({ description: '로그인 아이디' })
  userName: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;
}
