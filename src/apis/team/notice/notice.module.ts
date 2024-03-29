import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
