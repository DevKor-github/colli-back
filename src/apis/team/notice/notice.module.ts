import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeRepository } from './notice.repository';
import { NoticeController } from './notice.controller';

@Module({
  imports: [],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
  exports: [NoticeService],
})
export class NoticeModule {}
