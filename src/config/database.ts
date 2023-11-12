import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CustomTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      // host: configService.get('DATABASE_HOST'),
      host: 'localhost',
      port: configService.get<number>('DATABASE_PORT'),
      // port: 3306,
      // database: configService.get('DATABASE_NAME'),
      database: 'colly',
      // username: configService.get<string>('DATABASE_USER'),
      username: 'colly_admin',
      // password: configService.get('DATABASE_PASSWORD'),
      password: 'colly1234!!',
      entities: ['dist/entities/*{.ts,.js}'],
      // true이면 db 바뀔 때마다 재생성
      synchronize: true,
      timezone: '+09:00',
    };
  },
});
