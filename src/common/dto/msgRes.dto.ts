import { ApiProperty } from '@nestjs/swagger';

export class MsgResDto {
  @ApiProperty({ description: '메시지', default: '성공' })
  message: string;

  @ApiProperty({ description: '코드', default: 'SUCCESS' })
  code: string;

  static async success(msg?: string, code?: string) {
    const resDto = new MsgResDto();
    resDto.message = msg ?? '성공';
    resDto.code = code ?? 'SUCCESS';

    return resDto;
  }
}
