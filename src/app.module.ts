import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
import { CustomTypeOrmRepositoryModule } from './config/customTypeOrmRepository';
import { UserRepository } from './apis/user/user.repository';
import { MemberRepository } from './apis/member/member.repository';
import {
  TeamScheduleRepository,
  UserScheduleRepository,
} from './apis/schedule/schedule.repository';
import {
  TeamTaskReposiotry,
  UserTaskReposiotry,
} from './apis/task/task.repository';
import { MemberModule } from './apis/member/member.module';
import { ScheduleModule } from './apis/schedule/schedule.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ColliTypeOrmModule,
    CustomTypeOrmRepositoryModule.forCustomRepository([
      UserRepository,
      MemberRepository,
      TeamScheduleRepository,
      UserScheduleRepository,
      TeamTaskReposiotry,
      UserTaskReposiotry,
    ]),
    UserModule,
    MemberModule,
    ScheduleModule,
  ],
})
export class AppModule {}
