import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty({ description: 'Общее количество желаний пользователя' })
  wishTotal: number;

  @ApiProperty({ description: 'Количество публичных желаний пользователя' })
  wishPublic: number;

  @ApiProperty({ description: 'Количество исполненных желаний пользователя' })
  wishComplete: number;
}
