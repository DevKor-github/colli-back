import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';

@Module({
  imports: [CustomTypeOrmRepositoryModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
