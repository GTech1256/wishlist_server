import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToMany(() => List, (list) => list.items)
  list: List;
}
