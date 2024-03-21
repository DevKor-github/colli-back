import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
import { MemberModule } from './apis/team/member/member.module';
import { ScheduleModule } from './apis/team/schedule/schedule.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './apis/auth/auth.module';
import { ColliRouterModule } from './config/routes';
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
  ],
})
export class AppModule {}
