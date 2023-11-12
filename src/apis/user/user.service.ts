import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { GetProfileResDto } from './dto/GetProfileRes.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(userId: number) {
    const data = await this.userRepository.findOneByOrFail({ id: userId });

    return GetProfileResDto.makeRes(data);
  }
}
