import { Injectable } from '@nestjs/common';
import {
  TeamScheduleRepository,
  UserScheduleRepository,
} from './schedule.repository';
import { ScheduleResDto } from './dto/scheduleRes.dto';
import { GetCalendarReqDto } from './dto/getCalendarReq.dto';
import { ScheduleReqDto } from './dto/scheduleReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { MemberRepository } from '../member/member.repository';
import { TeamScheduleResDto } from './dto/teamScheduleRes.dto';
import { UserScheduleResDto } from './dto/userScheduleRes.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly userScheduleRepository: UserScheduleRepository,
    private readonly teamScheduleRepository: TeamScheduleRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async getScheduleDetail(
    scheduleId: number,
    isTeam: boolean,
    color: number = 0,
  ): Promise<ScheduleResDto> {
    if (isTeam)
      return this.teamScheduleRepository.findTeamScheduleDetail(
        scheduleId,
        color,
      );
    else return this.userScheduleRepository.findUserScheduleDetail(scheduleId);
  }

  async getTeamCalendar(teamId: number, req: GetCalendarReqDto, color: number) {
    // 캘린더 조회 시작구간, 종료구간
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);
    const arr = new Array<number>(35).fill(0);

    const teamSchedules = await this.teamScheduleRepository.findTeamCalendar(
      teamId,
      startDate,
      endDate,
      color,
    );

    const calArr = this.makeCalendarArray(
      teamSchedules,
      startDate,
      endDate,
      arr,
    );

    return { dataList: calArr };
  }

  async getTeamDateCalendar(
    teamId: number,
    req: GetCalendarReqDto,
    color: number,
  ) {
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);

    const teamSchedules = await this.teamScheduleRepository.findTeamCalendar(
      teamId,
      startDate,
      endDate,
      color,
    );

    return { dataList: teamSchedules, totalCount: teamSchedules.length };
  }

  // 유저 캘린더 조회
  // 유저가 속해 있는 팀 캘린더도 모두 조회해서 가져와서 합쳐야함.
  async getUserCalendar(userId: number, req: GetCalendarReqDto) {
    // 캘린더 조회 시작구간, 종료구간
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);
    const arr = new Array<number>(35).fill(0);

    const userSchedules: UserScheduleResDto[] =
      await this.userScheduleRepository.findUserCalendar(
        userId,
        startDate,
        endDate,
      );

    const uCalArr = this.makeCalendarArray(
      userSchedules,
      startDate,
      endDate,
      arr,
    );

    const teamSchedules = await this.getBelongingTeamSchedules(
      userId,
      startDate,
      endDate,
    );

    const tCalArr = this.makeCalendarArray(
      teamSchedules,
      startDate,
      endDate,
      uCalArr,
    );

    return { dataList: tCalArr };
  }

  async getUserDateCalendar(userId: number, req: GetCalendarReqDto) {
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);

    const userSchedules = await this.userScheduleRepository.findUserCalendar(
      userId,
      startDate,
      endDate,
    );

    const teamSchedules = await this.getBelongingTeamSchedules(
      userId,
      startDate,
      endDate,
    );

    return {
      dataList: { user: userSchedules, team: teamSchedules },
      totalCount: userSchedules.length,
    };
  }

  // 캘린더 조회 함수에서 사용
  makeCalendarArray(
    dataList: ScheduleResDto[],
    startDate: Date,
    endDate: Date,
    calArr: number[],
  ): Array<number> {
    // 길이 35 배열 생성 (5주짜리)
    // 각 배열의 값은 구간 시작일로부터 날짜별로 있는 일정들의 개수
    // const calArr = new Array<number>(35).fill(0);
    // 들고온 scheduleList를 각 시나리오로 케이스를 나눠서 배열 count 올려주기
    dataList.map((dt) => {
      if (dt.startTime < startDate) {
        // 시나리오 1
        // 일정 시작이 구간 밖이고, 일정 종료도 구간 밖인 경우
        if (dt.endTime >= endDate) {
          for (let i = 0; i < 35; i++) {
            calArr[i]++;
          }
        }
        // 시나리오 2
        // 일정 시작이 구간 밖이고, 일정 종료가 구간 안인 경우
        else {
          const ei: number = Math.floor(
            (startDate.getTime() - dt.endTime.getTime()) / (1000 * 3600 * 24),
          );

          for (let i = 0; i < ei; i++) {
            calArr[i]++;
          }
        }
      } else {
        const si: number = Math.floor(
          (startDate.getTime() - dt.startTime.getTime()) / (1000 * 3600 * 24),
        );
        // 시나리오 3
        // 일정 시작이 구간 안이고, 일정 종료가 구간 밖인 경우
        if (dt.endTime >= endDate) {
          for (let i = si; i < 35; i++) {
            calArr[i]++;
          }
        }
        // 시나리오 4
        // 일정 시작이 구간 안이고, 일정 종료도 구간 안인 경우
        else {
          const ei: number =
            (startDate.getTime() - dt.endTime.getTime()) / (1000 * 3600 * 24);

          for (let i = si; i < ei; i++) {
            calArr[i]++;
          }
        }
      }
    });

    return calArr;
  }

  // 유저가 속해 있는 팀의 스케쥴 목록 가져오기
  async getBelongingTeamSchedules(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const members = await this.memberRepository.find({
      where: { userId },
    });

    const teamSchedulesNested = await Promise.all(
      members.map(
        async (dt) =>
          await this.teamScheduleRepository.findTeamCalendar(
            dt.teamId,
            startDate,
            endDate,
            dt.color,
          ),
      ),
    );

    const teamSchedules: TeamScheduleResDto[] = [].concat(
      ...teamSchedulesNested,
    );

    return teamSchedules;
  }

  async addSchedule(req: ScheduleReqDto, isTeam: boolean, id: number) {
    const startTime = new Date(req.startTime);
    const endTime = new Date(req.endTime);

    if (isTeam) {
      await this.teamScheduleRepository.insert({
        teamId: id,
        startTime,
        endTime,
        ...req,
      });
    } else {
      await this.userScheduleRepository.insert({
        userId: id,
        startTime,
        endTime,
        ...req,
      });
    }

    return MsgResDto.ret();
  }

  async modifySchedule(
    req: ScheduleReqDto,
    scheduleId: number,
    isTeam: boolean,
    id: number, // 팀id or 유저 id
  ) {
    const startTime = new Date(req.startTime);
    const endTime = new Date(req.endTime);

    if (isTeam) {
      await this.teamScheduleRepository.save({
        id: scheduleId,
        teamId: id,
        startTime: startTime,
        endTime: endTime,
        ...req,
      });
    } else {
      await this.userScheduleRepository.insert({
        id: scheduleId,
        userId: id,
        startTime,
        endTime,
        ...req,
      });
    }

    return MsgResDto.ret();
  }

  async removeScheule(scheduleId: number, isTeam: boolean, id: number) {
    if (isTeam) {
      await this.teamScheduleRepository.softRemove({
        id: scheduleId,
        teamId: id,
      });
    } else {
      await this.userScheduleRepository.softRemove({
        id: scheduleId,
        userId: id,
      });
    }

    return MsgResDto.ret();
  }
}
