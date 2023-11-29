import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { TYPEORM_CUSTOM_REPOSITORY } from 'src/common/decorators/customRepository';
import { DataSource } from 'typeorm';

export class CustomTypeOrmRepositoryModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_CUSTOM_REPOSITORY, repository);

      if (!entity) {
        continue;
      }
      // dataSource를 주입받아 방법 1과 같이 커스텀 레퍼지토리를 만들어주고 provider에 추가한다.
      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: CustomTypeOrmRepositoryModule,
      providers,
    };
  }
}
