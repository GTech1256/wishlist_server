import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Название желания' })
  title: string;

  @ApiProperty({ description: 'Описание желания' })
  description?: string;

  @ApiProperty({ description: 'URL изображения желания' })
  url?: string;

  @ApiProperty({ description: 'Цена желания' })
  price?: number;

  @ApiProperty({ description: 'Флаг публичности желания' })
  isPublic?: boolean;
}
