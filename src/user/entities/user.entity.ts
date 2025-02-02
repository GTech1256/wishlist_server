import { Wish } from 'src/wish/entities/wish.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryColumn,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty({ description: 'Уникальный идентификатор пользователя' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Фамилия пользователя' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'Имя пользователя в Telegram' })
  @Column()
  username: string;

  @ApiProperty({ description: 'URL изображения пользователя' })
  @Column()
  avatar: string;

  @OneToMany(() => Wish, (wish) => wish.user)
  @JoinTable()
  wishes: Wish[];

  @OneToOne(() => Collection, (collection) => collection.user)
  @JoinTable()
  collection: Collection;
}
