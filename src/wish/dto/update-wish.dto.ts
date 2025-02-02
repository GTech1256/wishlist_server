import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './create-wish.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @ApiProperty({ description: 'Уникальный идентификатор желания' })
  id: number;
}
