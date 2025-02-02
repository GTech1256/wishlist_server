import { Wish } from 'src/wish/entities/wish.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Collection {
  @ApiProperty({ description: 'Уникальный идентификатор коллекции' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Название коллекции' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Пользователь, который создал коллекцию' })
  @OneToOne(() => User, (user) => user.collection)
  @JoinTable()
  user: User;

  @ApiProperty({ description: 'Желания, которые входят в коллекцию' })
  @OneToMany(() => Wish, (wish) => wish.collection)
  @JoinTable()
  wishes: Wish[];
}
