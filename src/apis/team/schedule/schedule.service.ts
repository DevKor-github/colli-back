import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleResDto } from './dto/scheduleRes.dto';
import { GetCalendarReqDto } from './dto/getCalendarReq.dto';
import { ScheduleReqDto } from './dto/scheduleReq.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { DateCalendarResDto } from './dto/dateCalendarRes.dto';
import { CalendarCountResDto } from './dto/calendarCountRes.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async getScheduleDetail(scheduleId: number): Promise<ScheduleResDto> {
    return this.scheduleRepository.findScheduleDetail(scheduleId);
  }

  async getScheduleCalendar(
    teamId: number,
    req: GetCalendarReqDto,
  ): Promise<CalendarCountResDto> {
    // 캘린더 조회 시작구간, 종료구간
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);
    const arr = new Array<number>(35).fill(0);

    const schedules = await this.scheduleRepository.findScheduleCalendar(
      teamId,
      startDate,
      endDate,
    );

    const calArr = this.makeCalendarArray(schedules, startDate, endDate, arr);

    return CalendarCountResDto.makeRes(calArr);
  }

  async getScheduleDateCalendar(
    teamId: number,
    req: GetCalendarReqDto,
  ): Promise<DateCalendarResDto> {
    const startDate = new Date(req.start);
    const endDate = new Date(req.end);

    const schedules = await this.scheduleRepository.findScheduleCalendar(
      teamId,
      startDate,
      endDate,
    );

    return DateCalendarResDto.makeRes(schedules, schedules.length);
  }

  // 유저 캘린더 조회
  // 유저가 속해 있는 팀 캘린더도 모두 조회해서 가져와서 합쳐야함.
  /*
  async getUserCalendar(
    userId: number,
    req: GetCalendarReqDto,
  ): Promise<CalendarCountResDto> {
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

    return CalendarCountResDto.makeRes(tCalArr);
  }
  */
  /*
  async getUserDateCalendar(
    userId: number,
    req: GetCalendarReqDto,
  ): Promise<MergedDateCalendarResDto> {
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

    return MergedDateCalendarResDto.makeRes(
      DateCalendarResDto.makeRes(userSchedules, userSchedules.length),
      DateCalendarResDto.makeRes(teamSchedules, teamSchedules.length),
    );
  }
*/
  // 캘린더 조회 함수에서 사용
  makeCalendarArray(
    dataList: ScheduleResDto[],
    startDate: Date,
    endDate: Date,
    calArr: number[],
  ): number[] {
    // 길이 35 배열 생성 (5주짜리)
    // 각 배열의 값은 구간 시작일로부터 날짜별로 있는 일정들의 개수
    // const calArr = new Array<number>(35).fill(0);
    // 들고온 scheduleList를 각 시나리오로 케이스를 나눠서 배열 count 올려주기
    dataList.map((dt) => {
      // 좀 더 깔끔한 코드
      // const tsi =
      //   dt.startTime < startDate
      //     ? 0
      //     : Math.floor(
      //         (dt.startTime.getTime() - startDate.getTime()) /
      //           (1000 * 3600 * 24),
      //       );

      // const tei =
      //   dt.endTime >= endDate
      //     ? 35
      //     : Math.ceil(
      //         (dt.endTime.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      //       );

      // for (let i = tsi; i < tei; i++) calArr[i]++;

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
          const ei: number = Math.ceil(
            (dt.endTime.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
          );

          for (let i = 0; i < ei; i++) {
            calArr[i]++;
          }
        }
      } else {
        const si: number = Math.floor(
          (dt.startTime.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
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
          const ei: number = Math.ceil(
            (dt.endTime.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
          );

          for (let i = si; i < ei; i++) {
            calArr[i]++;
          }
        }
      }
    });

    return calArr;
  }

  // 유저가 속해 있는 팀의 스케쥴 목록 가져오기
  /*
  async getBelongingTeamSchedules(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<TeamScheduleResDto[]> {
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
  */

  async addSchedule(req: ScheduleReqDto, teamId: number) {
    const startTime = new Date(req.startTime);
    const endTime = new Date(req.endTime);

    await this.scheduleRepository.insert({
      teamId,
      startTime,
      endTime,
      ...req,
    });

    return MsgResDto.ret();
  }

  async modifySchedule(
    req: ScheduleReqDto,
    scheduleId: number,
    teamId: number,
  ): Promise<MsgResDto> {
    const startTime = new Date(req.startTime);
    const endTime = new Date(req.endTime);

    await this.scheduleRepository.findOneByOrFail({
      id: scheduleId,
      teamId,
    });

    await this.scheduleRepository.update(
      { id: scheduleId, teamId },
      {
        startTime: startTime,
        endTime: endTime,
        ...req,
      },
    );

    return MsgResDto.ret();
  }

  async removeScheule(scheduleId: number, teamId: number): Promise<MsgResDto> {
    await this.scheduleRepository.findOneByOrFail({
      id: scheduleId,
      teamId,
    });

    await this.scheduleRepository.softRemove({
      id: scheduleId,
      teamId,
    });

    return MsgResDto.ret();
  }
}
