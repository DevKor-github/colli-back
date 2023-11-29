import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';
import { MemberRepository } from './member.repository';

@Module({
  imports: [CustomTypeOrmRepositoryModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService, MemberRepository],
})
export class MemberModule {}
