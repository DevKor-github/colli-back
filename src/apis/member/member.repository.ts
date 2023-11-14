import { Injectable } from '@nestjs/common';
import { Member } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MemberRepository extends Repository<Member> {}
