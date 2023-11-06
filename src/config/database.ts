import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CustomTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      database: configService.get('DATABASE_NAME'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      entities: ['dist/entities/*{.ts,.js}'],
      synchronize: true,
      timezone: 'Asia/Seoul',
    };
  },
});
