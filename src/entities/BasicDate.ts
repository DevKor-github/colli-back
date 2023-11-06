import {
  CreateDateColumn,
  DeleteDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BasicDate {
  /**
   생성일자
  */
  @CreateDateColumn()
  createdAt: Timestamp;

  /**
   마지막 수정일자
  */
  @UpdateDateColumn()
  updatedAt: Timestamp;

  /**
   삭제일자
  */
  @DeleteDateColumn()
  deletedAt: Timestamp;
}
