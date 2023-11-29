import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';

@Module({
  imports: [CustomTypeOrmRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
