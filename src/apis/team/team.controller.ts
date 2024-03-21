import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { TeamReqDto } from './dto/teamReq.dto';
import { TeamResDto } from './dto/teamRes.dto';
import { MemberService } from './member/member.service';

@ApiTags('task')
@Controller()
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly memberService: MemberService,
  ) {}

  @Get('/:teamId')
  @ApiOkResponse({ description: '팀 정보 조회' })
  async getTeamDetail(
    @Param('teamId') teamId: number,
    // userId: number,
  ): Promise<TeamResDto> {
    // await this.memberService.checkIsMember(teamId, userId);

    return this.teamService.getTeamDetail(teamId);
  }

  //만드는 유저는 member 테이블에 isManager를 줘야함
  @Post('/add')
  @ApiOkResponse({ type: MsgResDto, description: '팀 생성' })
  async addTeam(@Body() addTeamReqDto: TeamReqDto): Promise<MsgResDto> {
    return this.teamService.addTeam(addTeamReqDto);
  }

  // 얘는 매니저로 가야할려나?
  @Patch('/:teamId/modify')
  @ApiOkResponse({ type: MsgResDto, description: '팀 정보 수정' })
  async modifyTeamDetail(
    @Param('teamId') teamId: number,
    @Body() modifyTeamDetailReqDto: TeamReqDto,
    // userId: number,
  ): Promise<MsgResDto> {
    // await this.memberService.checkIsMember(teamId, userId);

    return this.teamService.modifyTeamDetail(modifyTeamDetailReqDto, teamId);
  }

  //isManager 권한이 있는 유저만 가능
  @Delete('/:teamId/remove')
  @ApiOkResponse({ type: MsgResDto, description: '팀 삭제' })
  async removeTeam(@Param('teamId') teamId: number): Promise<MsgResDto> {
    // await this.memberService.checkIsManager(teamId, userId);

    return this.teamService.removeTeam(teamId);
  }

  //   //isManager 권한이 있는 유저만 가능
  //   @Post('/team/:teamId/makeCode')
  //   @ApiOkResponse({ type: MsgResDto, description: '팀 초대 코드 생성' })
  //   async createTeamInvitationCode(
  //     @Param('teamId') teamId: number,
  //     @Body() createTeamInvitationCodeReqDto: TeamReqDto,
  //   ) {}

  // memberController가 굳이 필요할까...?

  //   @Get('/team/:teamId/members')
  //   @ApiOkResponse({ description: '팀 멤버 목록 조회' })
  //   async getTeamMembers(@Param('teamId') teamId: number) {}

  //   @Patch('/team/member/:memberId')
  //   @ApiOkResponse({ type: MsgResDto, description: '팀 멤버 권한 수정' })
  //   async modifyMemberAuthority(
  //     @Param('teamId') teamId: number,
  //     @Param('memberId') memberId: number,
  //     @Body() modifyMemberAuthorityReqDto,
  //   ) {}

  //   //isManager 권한이 있는 유저만 가능
  //   @Delete('/team/member/:memberId')
  //   @ApiOkResponse({ type: MsgResDto, description: '팀 멤버 삭제' })
  //   async removeTeamMember(@Param('memberId') memberId: number) {}
}
