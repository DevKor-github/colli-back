import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { UserModule } from '../../user/user.module';
import { MemberModule } from '../member/member.module';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [UserModule, MemberModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService],
})
export class ScheduleModule {}
