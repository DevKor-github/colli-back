import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginColliReqDto } from './dto/loginColliReq.dto';
import { JoinColliReqDto } from './dto/joinColliReq.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login/colli')
  @ApiOkResponse({ description: '로그인 - 콜리' })
  async loginColli(@Body() loginColliReqDto: LoginColliReqDto) {
    const { userName } = loginColliReqDto;

    await this.authService.login(userName);
  }

  //이미 아이디 중복검증이 마친 상태
  @Post('/join/colli')
  @ApiOkResponse({ description: '회원가입 - 콜리' })
  async joinColli(@Body() joinColliReqDto: JoinColliReqDto) {
    const { userName, password } = joinColliReqDto;
    // 그냥 넘겨줄 때 같이 넘겨주자
    // create의 결과물로 id가 넘어올 텐디 다시 확인해봐야함.
    // 근데 사실 이 과정이 맞는지 잘 모르겠네.
    const { id } = await this.userService.addUser();
    return this.authService.join(id, userName, password);
  }

  @Delete('/withdraw/colli/:username')
  @ApiOkResponse({ description: '회원탈퇴 - 콜리' })
  async withdrawColli(@Param('username') username: string) {}
}
