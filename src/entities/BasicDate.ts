import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasicDate {
  /**
   생성일자
  */
  @CreateDateColumn()
  createdAt: Date;

  /**
   마지막 수정일자
  */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   삭제일자
  */
  @DeleteDateColumn()
  deletedAt: Date;
}
