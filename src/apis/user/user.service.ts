import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResDto } from './dto/userRes.dto';
import { UserReqDto } from './dto/userReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { User } from 'src/entities';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(userId: number) {
    const data = await this.userRepository.findOneByOrFail({ id: userId });

    return UserResDto.makeRes(data);
  }

  // empty User 생성 - auth에서 이걸 쓸지, 그냥 reposiotry를 바로 호출해서 쓸지는 모르겠다.
  async addUser(): Promise<User> {
    return this.userRepository.create();
  }

  async modifyUser(req: UserReqDto, userId: number): Promise<MsgResDto> {
    return await this.userRepository.findAndUpdate(req, userId);
  }
}
