import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { UserModule } from '../user/user.module';
import { MemberModule } from '../member/member.module';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';

@Module({
  imports: [CustomTypeOrmRepositoryModule, UserModule, MemberModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
