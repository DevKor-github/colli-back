import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ColliTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      database: configService.get('DATABASE_NAME'),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      entities: ['dist/entities/*{.ts,.js}'],
      // true이면 db 바뀔 때마다 재생성
      synchronize: true,
      timezone: '+09:00',
    };
  },
});
