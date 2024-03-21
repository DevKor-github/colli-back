import { RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from 'src/apis/auth/auth.module';
import { MemberModule } from 'src/apis/team/member/member.module';
import { ScheduleModule } from 'src/apis/team/schedule/schedule.module';
import { TaskModule } from 'src/apis/team/task/task.module';
import { TeamModule } from 'src/apis/team/team.module';
import { UserModule } from 'src/apis/user/user.module';

export const ColliRouterModule = RouterModule.register([
  { path: 'auth', module: AuthModule },
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'team',
    module: TeamModule,
    children: [
      { path: ':teamId/task', module: TaskModule },
      { path: ':teamId/schedule', module: ScheduleModule },
      { path: ':teamId/member', module: MemberModule },
    ],
  },
]);
