import { ApiProperty } from '@nestjs/swagger';

export abstract class DateResDto {
  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ description: 'modifiedAt' })
  modifiedAt: Date;

  @ApiProperty({ description: 'deletedAt' })
  deletedAt: Date;
}
