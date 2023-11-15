import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async checkIsMember(userId: number, teamId: number) {
    if (!(await this.memberRepository.exist({ where: { userId, teamId } })))
      throw new Error('소속된 팀이 아닙니다.');
  }

  async checkIsManager(userId: number, teamId: number) {
    if (
      !(await this.memberRepository.exist({
        where: { userId, teamId, isManager: true },
      }))
    )
      throw new Error('팀장이 아닙니다.');
  }

  async getMemberListInTeam(
    teamId: number,
  ): Promise<ListResDto<GetMemberResDto>> {
    return this.memberRepository.findAllMembersInTeam(teamId);
  }

  async removeMemberFromTeam(
    teamId: number,
    memberId: number,
  ): Promise<MsgResDto> {
    const memberToBeRemoved = await this.memberRepository.findOneByOrFail({
      id: memberId,
      teamId,
    });

    await this.memberRepository.softRemove(memberToBeRemoved);

    return MsgResDto.ret();
  }
}
