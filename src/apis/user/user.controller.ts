import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProfileResDto } from './dto/GetProfileRes.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my')
  async getMyProfile(): Promise<GetProfileResDto> {
    return null;
  }

  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<GetProfileResDto> {
    return this.userService.getUserProfile(userId);
  }
}
