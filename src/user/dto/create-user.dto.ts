import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateUserDto {
  @ApiProperty({ description: 'Идентификатор пользователя' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @PrimaryColumn({ nullable: false, unique: true, type: 'int' })
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
