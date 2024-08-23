import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from '../team/task/task.module';
import { NoticeModule } from '../team/notice/notice.module';
import { MemberModule } from '../team/member/member.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MemberModule,
    TaskModule,
    NoticeModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
