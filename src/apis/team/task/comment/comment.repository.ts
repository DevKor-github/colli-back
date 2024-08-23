import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities';

@Injectable()
export class CommentRepository extends Repository<Comment> {}
