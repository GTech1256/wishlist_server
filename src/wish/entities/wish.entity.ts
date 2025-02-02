import { Collection } from 'src/collection/entities/collection.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Wish {
  @ApiProperty({ description: 'Уникальный идентификатор желания' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Название желания' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Описание желания', required: false })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ description: 'Цена желания', required: false })
  @Column({ nullable: true })
  price?: number;

  @ApiProperty({ description: 'Ссылка на файл', required: false })
  @Column({ nullable: true })
  fileLink?: string;

  @ApiProperty({ description: 'Является ли желание публичным', default: false })
  @Column({ default: false })
  isPublic?: boolean;

  @ApiProperty({ description: 'Пользователь, который создал желание' })
  @ManyToOne(() => User, (user) => user.wishes)
  @JoinTable({ name: 'userId' })
  user: User;

  @ApiProperty({ description: 'Коллекция, в которой находится желание' })
  @ManyToMany(() => Collection, (collection) => collection.wishes)
  @JoinTable()
  collection: Collection;
}
