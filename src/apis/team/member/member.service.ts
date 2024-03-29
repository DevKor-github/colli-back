import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { ListResDto } from 'src/common/dto/listRes.dto';
import { GetMemberResDto } from './dto/getMemberRes.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { MemberMetaResDto } from './dto/memberMetaRes.dto';
import { MemberRelationResDto } from './dto/memberRelationRes.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  // 유저/팀 아이디로 모든 멤버 조회하기
  async getAllMembersByJoinId(
    sortation: 'user' | 'team',
    id: number,
  ): Promise<ListResDto<MemberRelationResDto>> {
    if (sortation == 'user') {
      return this.memberRepository
        .findAllWithOption({ userId: id }, { team: true })
        .then(([datas, count]) => ({
          dataList: datas.map((data) => MemberRelationResDto.makeRes(data)),
          totalCount: count,
        }));
    } else {
      return this.memberRepository
        .findAllWithOption({ teamId: id }, { user: true })
        .then(([datas, count]) => ({
          dataList: datas.map((data) => MemberRelationResDto.makeRes(data)),
          totalCount: count,
        }));
    }
  }

  //여기 함수들 전반적으로 점검 한번 해야함.

  // memberMeta 정보가 필요한 경우 data를 받아서 사용하면 되고, 굳이 필요하지 않다면
  // 그냥 await checkIsMember(); 이런 식으로만 사용해도 된다.
  async checkIsMember(
    teamId: number,
    userId: number,
  ): Promise<MemberMetaResDto> {
    return this.memberRepository.findOneWithOptionOrFail({ teamId, userId });
  }

  // 임시 함수로 씀
  async checkIsMemberByMemberIdAndTeamId(memberId: number, teamId) {
    return this.memberRepository.findOneWithOptionOrFail({
      id: memberId,
      teamId,
    });
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

  //날려야 할거
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
