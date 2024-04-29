import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.list)
  user: User;

  @OneToMany(() => Item, (item) => item.list)
  items: Item[];
}
