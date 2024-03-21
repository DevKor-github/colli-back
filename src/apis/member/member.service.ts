import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { MemberMetaResDto } from './dto/memberMetaRes.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  // memberMeta 정보가 필요한 경우 data를 받아서 사용하면 되고, 굳이 필요하지 않다면
  // 그냥 await checkIsMember(); 이런 식으로만 사용해도 된다.
  async checkIsMember(
    teamId: number,
    userId: number,
  ): Promise<MemberMetaResDto> {
    return this.memberRepository.findMemberByOptions({ teamId, userId });
  }

  // 임시 함수로 씀
  async checkIsMemberByMemberIdAndTeamId(memberId: number, teamId) {
    return this.memberRepository.findMemberByOptions({ id: memberId, teamId });
  }

  async checkIsManager(
    userId: number,
    teamId: number,
  ): Promise<MemberMetaResDto> {
    return this.memberRepository
      .findOneByOrFail({
        userId,
        teamId,
        isManager: true,
      })
      .then((data) => MemberMetaResDto.makeRes(data))
      .catch(() => {
        throw new Error('팀장이 아닙니다.');
      });
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

  async getUserBelongingList(userId: number): Promise<number[]> {
    return this.memberRepository
      .findBy({ userId })
      .then((datas) => datas.map((dt) => dt.id));
  }
}
