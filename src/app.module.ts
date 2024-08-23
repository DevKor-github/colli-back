import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
import { MemberModule } from './apis/team/member/member.module';
import { ScheduleModule } from './apis/team/schedule/schedule.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './apis/auth/auth.module';
import { ColliRouterModule } from './config/routes';
import { TaskModule } from './apis/team/task/task.module';
import { TeamModule } from './apis/team/team.module';
import { NoticeModule } from './apis/team/notice/notice.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '3600s' },
    }),
    ColliTypeOrmModule,
    ColliRouterModule,
    AuthModule,
    UserModule,
    MemberModule,
    ScheduleModule,
    TaskModule,
    TeamModule,
    NoticeModule,
  ],
})
export class AppModule {}
