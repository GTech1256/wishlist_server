import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class CreateUserDto {
  @PrimaryColumn()
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Фамилия пользователя' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Никнейм пользователя' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Ссылка на аватар пользователя' })
  @IsString()
  @IsOptional()
  avatar?: string;
}
