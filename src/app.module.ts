import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { ColliTypeOrmModule } from './config/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UserModule,
    ColliTypeOrmModule,
  ],
})
export class AppModule {}
