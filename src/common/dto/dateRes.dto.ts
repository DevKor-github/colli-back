import { ApiProperty } from '@nestjs/swagger';

export abstract class DateResDto {
  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;
}
