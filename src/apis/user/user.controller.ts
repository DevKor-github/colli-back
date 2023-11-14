import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileResDto } from './dto/getProfileRes.dto';
import { ModifyProfileReqDto } from './dto/modifyProfileReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my/:tokenId')
  async getMyProfile(
    @Param('tokenId') tokenId: number,
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(tokenId);
  }

  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(userId);
  }

  @Patch('/modify/:userId')
  async modifyProfile(
    @Param('tokenId') tokenId: number,
    @Body() modifyProfileReqDto: ModifyProfileReqDto,
  ): Promise<MsgResDto> {
    return this.userService.modifyUser(tokenId, modifyProfileReqDto);
  }
}
