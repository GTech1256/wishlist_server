import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item/entities/item.entity';
import { User } from './user/entities/user.entity';
import { List } from './list/entities/list.entity';
import { ItemController } from './item/item.controller';
import { UserController } from './user/user.controller';
import { ItemService } from './item/item.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'wishlist',
      entities: [User, Item, List],
      synchronize: true,
    }),
    ItemModule,
    ListModule,
    UserModule,
  ],
  controllers: [AppController, ListController, ItemController, UserController],
  providers: [AppService, ListService, ItemService, UserController],
})
export class AppModule {}
