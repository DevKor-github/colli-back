import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
import { MemberModule } from './apis/member/member.module';
import { ScheduleModule } from './apis/schedule/schedule.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './apis/auth/auth.module';
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
    AuthModule,
    UserModule,
    MemberModule,
    ScheduleModule,
  ],
})
export class AppModule {}
