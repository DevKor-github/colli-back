import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';
import { UserRepository } from './user.repository';

@Module({
  imports: [CustomTypeOrmRepositoryModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
