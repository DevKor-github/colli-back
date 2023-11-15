import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 조회하는 사람이 팀에 속해 있어야 한다.
  @Get('list/:teamId/:tokenId')
  @ApiOkResponse({ description: '팀 멤버 조회' })
  async getMemberListInTeam(
    @Param('teamId') teamId: number,
    @Param('tokenId') tokenId: number,
  ): Promise<ListResDto<GetMemberResDto> | MsgResDto> {
    await this.memberService.checkIsMember(teamId, tokenId);

    return this.memberService.getMemberListInTeam(teamId);
  }

  // 추방하는 사람이 팀의 매니저여야 한다.
  @Delete('/remove/:teamId/:memberId/:tokenId')
  @ApiOkResponse({ description: '팀 멤버 추방' })
  async removeMemberFromTeam(
    @Param('teamId') teamId: number,
    @Param('memberId') memberId: number,
    @Param('tokenId') tokenId: number,
  ) {
    await this.memberService.checkIsManager(tokenId, teamId);

    return this.memberService.removeMemberFromTeam(teamId, memberId);
  }
}
