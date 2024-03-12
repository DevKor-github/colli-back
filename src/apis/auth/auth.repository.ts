import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<AuthUser> {
  constructor(private dataSource: DataSource) {
    super(AuthUser, dataSource.createEntityManager());
  }
}
