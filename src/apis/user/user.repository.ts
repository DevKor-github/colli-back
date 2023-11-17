import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { ModifyProfileReqDto } from './dto/modifyProfileReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  async findAndUpdate(
    tokenId: number,
    modifyProfileReqDto: ModifyProfileReqDto,
  ): Promise<MsgResDto> {
    const { phoneNum } = modifyProfileReqDto;
    const userData = await this.findOneByOrFail({ id: tokenId });

    await this.update(userData, { phoneNum });

    return MsgResDto.ret();
  }
}
