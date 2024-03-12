import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  //유저 정보가 옳은지 검사 후에 토큰 생성 및 반환에 사용
  async login(userName: string) {
    return this.jwtService.sign(userName);
  }

  async join(userId: number, userName: string, password: string) {
    const crypted: string = this.jwtService.sign(password, {
      secret: '비밀비밀비밀',
    });

    this.authRepository.insert({
      userId,
      userName,
      password: crypted,
    });

    return MsgResDto.ret();
  }

  //아이디 비밀번호 로그인 시 사용
  async validateWhenColliLogin(userName: string, password: string) {
    const auth = await this.authRepository
      .findOneByOrFail({ userName })
      .catch(() => {
        throw new UnauthorizedException();
      });
    if (!bcrypt.compare(password, auth.password))
      throw new UnauthorizedException();

    return true; //?
  }

  //들고 있는 jwt 토큰으로 로그인 되어 있는지 검증시 사용
  async validateWithJwt(userName: string, token) {
    const auth = await this.authRepository.findOneByOrFail({ userName });
  }
}
