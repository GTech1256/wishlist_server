import { Item } from 'src/item/entities/item.entity';
import { List } from 'src/list/entities/list.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToOne(() => List, (list) => list.user)
  list: List;
}
