import { User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { UserReqDto } from './dto/userReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAndUpdate(req: UserReqDto, userId: number): Promise<MsgResDto> {
    const { phoneNum } = req;
    const userData = await this.findOneByOrFail({ id: userId });

    await this.update(userData, { phoneNum });

    return MsgResDto.ret();
  }
}
