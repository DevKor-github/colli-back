import { Injectable } from '@nestjs/common';
import User from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {}
