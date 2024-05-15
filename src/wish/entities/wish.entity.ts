import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  fileLink?: string;

  @Column({ default: false })
  isPublic?: boolean;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinTable({ name: 'userId' })
  user: User;

  @ManyToMany(() => List, (list) => list.wishes)
  @JoinTable()
  list: List;
}
