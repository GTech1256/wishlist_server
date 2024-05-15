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

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.list)
  @JoinTable()
  user: User;

  @OneToMany(() => Wish, (wish) => wish.list)
  @JoinTable()
  wishes: Wish[];
}
