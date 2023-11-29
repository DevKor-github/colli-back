import { User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { ModifyProfileReqDto } from './dto/modifyProfileReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { Injectable } from '@nestjs/common';

// @CustomRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

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
