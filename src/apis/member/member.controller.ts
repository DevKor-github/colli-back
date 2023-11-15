import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 조회하는 사람이 팀에 속해 있어야 한다.
  @Get('list/:teamId/:tokenId')
  @ApiOkResponse({ description: '팀 멤버 조회' })
  async getMemberListInTeam(
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ) {}

  // 추방하는 사람이 팀의 매니저여야 한다.
  @Delete('/:memberId/remove/:tokenId')
  @ApiOkResponse({ description: '팀 멤버 추방' })
  async removeMemberFromTeam(
    @Param('memberId') memberId: number,
    @Param('tokenId') tokenId: number,
  ) {}
}
