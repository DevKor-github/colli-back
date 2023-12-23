import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
import { MemberModule } from './apis/member/member.module';
import { ScheduleModule } from './apis/schedule/schedule.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ColliTypeOrmModule,
    UserModule,
    MemberModule,
    ScheduleModule,
  ],
})
export class AppModule {}
