import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Идентификатор пользователя' })
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  name: string;

  @ApiProperty({ description: 'Фамилия пользователя' })
  lastName: string;

  @ApiProperty({ description: 'Никнейм пользователя' })
  username: string;

  @ApiProperty({ description: 'Ссылка на аватар пользователя' })
  avatar?: string;
}
