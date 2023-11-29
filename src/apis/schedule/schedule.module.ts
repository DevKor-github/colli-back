import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { UserModule } from '../user/user.module';
import { MemberModule } from '../member/member.module';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';
import {
  TeamScheduleRepository,
  UserScheduleRepository,
} from './schedule.repository';

@Module({
  imports: [CustomTypeOrmRepositoryModule, UserModule, MemberModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, UserScheduleRepository, TeamScheduleRepository],
  exports: [ScheduleService],
})
export class ScheduleModule {}
