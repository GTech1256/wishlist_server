import { Wish } from 'src/wish/entities/wish.entity';
import { List } from 'src/list/entities/list.entity';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @OneToMany(() => Wish, (wish) => wish.user)
  @JoinTable()
  wishes: Wish[];

  @OneToOne(() => List, (list) => list.user)
  @JoinTable()
  list: List;
}
