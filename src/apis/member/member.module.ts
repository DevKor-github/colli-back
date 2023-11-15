import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MemberRepository])],
})
export class MemberModule {}
